"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import JSZip from "jszip";

const examplePrompts = [
  "Create a clean white studio background with soft lighting and a subtle product shadow for a professional catalog photo",
  "Place the product on a dark luxury marble surface with warm golden lighting and a premium atmosphere",
  "Create a modern pastel background with smooth geometric shapes and soft daylight for a stylish product advertisement",
  "Place the product in a cozy modern workspace with natural window sunlight and realistic lifestyle surroundings",
];

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generateImage, setGenerateImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<"1:1" | "9:16" | "16:9">("1:1");
  const [formatMenuOpen, setFormatMenuOpen] = useState(false);
  const hasInvalidPunctuation = /[,.]/.test(prompt);

  const formatConfig = {
  "1:1": {
    title: "1:1 Product Listing",
    width: 1080,
    height: 1080,
  },
  "9:16": {
    title: "9:16 Story",
    width: 1080,
    height: 1920,
  },
  "16:9": {
    title: "16:9 Web Banner",
    width: 1920,
    height: 1080,
  },
} as const;

const currentFormat = formatConfig[selectedFormat];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            PixelCraft
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            AI Catalog Studio
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Turn ordinary product photos into professional marketing visuals.
          </p>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          {/* Upload */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              Upload your product photo
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              JPG, PNG or WEBP · Maximum 10 MB
            </p>

            <div className="mt-6">
              <CldUploadWidget
                uploadPreset={
                  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
                }
                options={{
                  sources: ["local"],
                  multiple: false,
                  maxFileSize: 10_000_000,
                  clientAllowedFormats: ["jpg", "png", "webp"],
                  resourceType: "image",
                }}
                onSuccess={(result) => {
                  if (
                    !result.info ||
                    typeof result.info === "string"
                  ) {
                    return;
                  }

                  setImageUrl(result.info.secure_url);
                  setPublicId(result.info.public_id);
                  setGenerateImage(false);
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full rounded-2xl bg-cyan-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Choose Product Image
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          {/* Uploaded Image */}
          {imageUrl && (
            <div className="mt-8">
              <h3 className="mb-3 text-lg font-semibold">
                Original Product
              </h3>

              <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                <img
                  src={imageUrl}
                  alt="Uploaded product"
                  className="mx-auto max-h-[500px] w-full object-contain"
                />
              </div>

              <p className="mt-3 break-all text-xs text-slate-500">
                Public ID: {publicId}
              </p>
            </div>
          )}

          {/* Prompt */}
          {imageUrl && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">
                Describe your scene
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Tell AI how you want your product to look.
              </p>

              <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-left">
              <p className="text-sm text-yellow-300">
                ⚠️ Avoid commas (,) and full stops (.) in your prompt
              </p>
            </div>

              {/* Prompt Input */}
              <textarea
                value={prompt}
                onChange={(e) => {
                setPrompt(e.target.value);
                setGenerateImage(false);
                }}
                placeholder="Example: Place this product on a luxury marble table with warm golden lighting and a premium atmosphere"
                rows={5}
                className="mt-5 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 p-5 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

              {hasInvalidPunctuation && (
                <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <p className="text-sm text-red-300">
                    ⚠️ Your prompt contains a comma or full stop. Please remove it before generating.
                  </p>
                </div>
              )}

              {/* Example Prompts */}
              <div className="mt-5">
                <p className="mb-3 text-sm font-medium text-slate-400">
                  Try an example
                </p>

                <div className="space-y-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setPrompt(example);
                        setGenerateImage(false);
                      }}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-left text-sm text-slate-400 transition hover:border-cyan-400/50 hover:text-white"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Preview */}
              {prompt.trim() && (
                <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Your AI instruction
                  </p>

                  <p className="mt-2 text-sm leading-6 text-cyan-300">
                    {prompt}
                  </p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="button"
                disabled={!prompt.trim() || hasInvalidPunctuation || isGenerating}
                onClick={() => {
                  setGenerationError("");
                  setIsGenerating(true);
                  setGenerateImage(true);
                }}
                className="mt-6 w-full rounded-2xl bg-cyan-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isGenerating ? "✨ Generating..." : "✨ Generate Professional Visual"}
              </button>
            </div>
          )}
          {generationError && (
            <div className="mt-4 rounded-xl border border-red-400/40 bg-red-950/30 px-4 py-3 text-sm text-red-300">
              ❌ {generationError}
            </div>
          )}
          {/* AI Generated Result */}
          {generateImage && publicId && prompt.trim() && (
          <div className="relative mt-8 overflow-visible rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-5 shadow-2xl">
            {/* Title + Format Button */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">
                {currentFormat.title}
              </h2>

            <div className="relative">
              <button
                type="button"
                onClick={() => setFormatMenuOpen(!formatMenuOpen)}
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400"
              >
                {selectedFormat} ▼
              </button>

              {formatMenuOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
                  {(["1:1", "9:16", "16:9"] as const).map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => {
                      setSelectedFormat(format);
                      setFormatMenuOpen(false);
                  }}
                  className={`block w-full px-4 py-3 text-left text-sm transition ${
                    selectedFormat === format
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {format} · {formatConfig[format].title.split(" ").slice(1).join(" ")}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Dynamic Preview */}
      <div
        className="mx-auto overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-950"
        style={{
          maxWidth:
            selectedFormat === "9:16"
              ? "360px"
              : selectedFormat === "16:9"
                ? "100%"
                : "520px",
        }}
      >
        <CldImage
          src={publicId}
          width={currentFormat.width}
          height={currentFormat.height}
          alt={`${currentFormat.title} product visual`}
          rawTransformations={[
            "e_background_removal",
            `c_pad,w_${currentFormat.width},h_${currentFormat.height},g_center,b_transparent`,
            `e_gen_background_replace:prompt_${prompt}`,
          ]}
          quality="auto"
          format="auto"
          className="h-auto w-full"
          onLoad={() => setIsGenerating(false)}
          onError={() => {
            setIsGenerating(false);
            setGenerationError(
              "Something went wrong while generating the image. Please try again."
            );
          }}
        />
          </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const downloadUrl = getCldImageUrl({
                  src: publicId,
                  width: currentFormat.width,
                  height: currentFormat.height,
                  rawTransformations: [
                    "e_background_removal",
                  `c_pad,w_${currentFormat.width},h_${currentFormat.height},g_center,b_transparent`,
                  `e_gen_background_replace:prompt_${prompt}`,
                  "fl_attachment",
                ],
              });

              window.open(downloadUrl, "_blank");
            }}
            className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            ⬇ Download Image
          </button>
          <button
            type="button"
            onClick={async () => {
  const formats = [
    {
      name: "ai-catalog-product-listing.webp",
      width: 1080,
      height: 1080,
    },
    {
      name: "ai-catalog-story.webp",
      width: 1080,
      height: 1920,
    },
    {
      name: "ai-catalog-web-banner.webp",
      width: 1920,
      height: 1080,
    },
  ];

  const zip = new JSZip();

  for (const format of formats) {
    const imageUrl = getCldImageUrl({
      src: publicId,
      width: format.width,
      height: format.height,
      rawTransformations: [
        "e_background_removal",
        `c_pad,w_${format.width},h_${format.height},g_center,b_transparent`,
        `e_gen_background_replace:prompt_${prompt}`,
      ],
      quality: "auto",
      format: "auto",
    });

    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();

    zip.file(format.name, imageBlob);
  }

  const zipBlob = await zip.generateAsync({
    type: "blob",
  });

  const downloadUrl = URL.createObjectURL(zipBlob);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "ai-catalog-formats.zip";
  link.click();

  URL.revokeObjectURL(downloadUrl);
}}
            className="rounded-xl border border-cyan-400/40 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-800"
          >
            📦 Download All Formats
          </button>
            </div>
            <p className="mt-3 text-center text-sm text-slate-500">
              {selectedFormat} format · Generated with Cloudinary AI
            </p>
          </div>
        )}

        </div>

        <p className="mt-8 text-sm text-slate-600">
          Powered by Cloudinary
        </p>
      </div>
    </main>
  );
}