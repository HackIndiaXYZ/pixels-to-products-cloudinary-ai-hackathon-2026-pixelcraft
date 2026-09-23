# AI Catalog Studio

AI Catalog Studio is a generative product-visual creation tool built for the
**Pixels to Products — Cloudinary AI Hackathon 2026**.

It transforms a basic product photo into professional marketing-ready visuals
using **Cloudinary AI-powered background generation and image transformations**.

## Problem

Small e-commerce sellers often have basic product photos taken with a phone.
Creating professional backgrounds and different marketing formats manually
requires time and design skills.

AI Catalog Studio simplifies this process by allowing a seller to upload a
product image, describe the desired visual using a natural-language prompt,
and generate professional marketing visuals.

## Features

- Upload a product image
- Enter a custom AI visual prompt
- Generate an AI-enhanced product visual
- Preserve the original product while generating a new background
- Generate multiple marketing formats:
  - 1:1 Product Listing
  - 9:16 Story
  - 16:9 Web Banner
- Preview each format
- Download an individual generated image
- Download all three formats as a single ZIP file
- Generation loading state
- Generation error handling
- Responsive dark-themed interface

## How It Works

```text
Product Photo
     ↓
Cloudinary Upload
     ↓
Background Removal
     ↓
Cloudinary AI Background Generation
     ↓
Marketing Format Transformation
     ↓
Optimized Output
     ↓
Download / ZIP

```
## Cloudinary Usage

Cloudinary is the core media engine of AI Catalog Studio.
The application uses Cloudinary for:
- Product image upload
- Background removal
- Generative background replacement
- Image transformations and resizing
- Automatic image quality optimization
- Automatic image format selection
- Delivery of generated images
The AI-generated background is created from the user's natural-language prompt while the original product is preserved.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Cloudinary
- Cloudinary AI
- next-cloudinary
- JSZip

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/HackIndiaXYZ/pixels-to-products-cloudinary-ai-hackathon-2026-pixelcraft.git
cd pixels-to-products-cloudinary-ai-hackathon-2026-pixelcraft
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Do not commit `.env.local` or expose Cloudinary API credentials publicly.**

### 4. Run the development server

```bash
npm run dev
```

Open:

`http://localhost:3000`

## Usage

1. Upload a product image.
2. Enter a natural-language prompt describing the desired background or scene.
3. Click **Generate Professional Visual**.
4. Wait for the AI-generated visual.
5. Switch between:
   - 1:1 Product Listing
   - 9:16 Story
   - 16:9 Web Banner
6. Download one image or download all three formats as a ZIP file.

## Example Prompt

Place the product on a dark luxury marble surface with warm golden lighting and a premium atmosphere

## Project Structure

```text
ai-catalog-studio/
│
├── app/
│   ├── page.tsx
│   └── ...
│
├── lib/
│   └── cloudinary.ts
│
├── public/
│
├── .env.local
├── package.json
├── package-lock.json
└── README.md

```

## Hackathon

**Hackathon:** Pixels to Products — Cloudinary AI Hackathon 2026

**Track:** Generative Content Workflows

**Project:** AI Catalog Studio

**Team:** PixelCraft

## Future Improvements

Potential future improvements include:

- Additional visual generation controls
- More marketing templates
- Batch product processing
- Additional export formats
- Advanced product positioning controls
- Deployment with a production URL

## Security

API keys and secrets must remain private.

Never commit `.env.local` or Cloudinary API credentials to the public repository.