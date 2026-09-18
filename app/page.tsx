"use client";

import { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const scenes = [
  {
    name: "Studio",
    prompt:
      "professional white studio with a clean seamless backdrop and softbox lighting with a subtle product shadow for bright commercial catalog photography",
  },
  {
    name: "Luxury",
    prompt:
      "dark luxury marble countertop with warm golden lighting and an elegant premium interior with dramatic shadows for high end advertising photography",
  },
  {
    name: "Minimal",
    prompt:
      "modern pastel geometric background with smooth curved surfaces and soft daylight with a clean contemporary product advertisement",
  },
  {
    name: "Lifestyle",
    prompt:
      "realistic modern desk environment beside a laptop and coffee cup with natural window sunlight and a cozy workspace for authentic lifestyle product photography",
  },
];

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [selectedScene, setSelectedScene] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [generateImage, setGenerateImage] = useState(false);

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

          {/* Scene Selection */}
          {imageUrl && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold">
                Choose a scene
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Select a style for your professional product image.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {scenes.map((scene) => (
                  <button
                    key={scene.name}
                    type="button"
                    onClick={() => {
                      setSelectedScene(scene.name);
                      setSelectedPrompt(scene.prompt);
                      setGenerateImage(false);
                    }}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selectedScene === scene.name
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-slate-700 bg-slate-950 hover:border-slate-500"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">
                      {scene.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {scene.prompt}
                    </p>
                  </button>
                ))}
              </div>

              {/* Selected Scene */}
              {selectedScene && (
                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <p className="text-sm text-slate-500">
                    Selected scene
                  </p>

                  <p className="mt-1 text-lg font-semibold text-cyan-400">
                    {selectedScene}
                  </p>
                </div>
              )}

              {/* Generate Button */}
              <button
                type="button"
                disabled={!selectedScene}
                onClick={() => setGenerateImage(true)}
                className="mt-6 w-full rounded-2xl bg-cyan-500 px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Generate Professional Visual
              </button>
            </div>
          )}

          {/* AI Generated Result */}
          {generateImage && publicId && selectedPrompt && (
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
                  replaceBackground={selectedPrompt}
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