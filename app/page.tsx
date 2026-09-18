"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

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

  const hasInvalidPunctuation = /[,.]/.test(prompt);

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
                disabled={!prompt.trim() || hasInvalidPunctuation}
                onClick={() => setGenerateImage(true)}
                className="mt-6 w-full rounded-2xl bg-cyan-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ✨ Generate Professional Visual
              </button>
            </div>
          )}

          {/* AI Generated Result */}
          {generateImage && publicId && prompt.trim() && (
            <div className="mt-10">
              <h2 className="mb-4 text-2xl font-semibold">
                AI Generated Visual
              </h2>

              <div className="overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-950">
                <CldImage
                  src={publicId}
                  width={1080}
                  height={1080}
                  alt="AI generated product visual"
                  replaceBackground={prompt}
                  crop="fill"
                  gravity="auto"
                  quality="auto"
                  format="auto"
                  className="h-auto w-full"
                />
              </div>

              <p className="mt-3 text-center text-sm text-slate-500">
                Generated with Cloudinary AI
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