# Book Finder Application

A book discovery and search application built with Next.js 16 (App Router), Tailwind CSS, shadcn/ui, and MongoDB. It connects to the Google Books API for real-time queries and integrates a persistent wishlist feature.

## Prerequisites

- Node.js 20+ or 22+
- pnpm (v10 or v11)
- Docker & Docker Compose (optional, for containerized run)

## Setup & Local Run

### 1. Environment Variables

Create a `.env` file in the root of the project:

```env
MONGODB_URI=mongodb://localhost:27017/book-app
GOOGLE_BOOKS_API_URL=https://www.googleapis.com/books/v1/volumes
GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
```

_Note: You can run queries without a `GOOGLE_BOOKS_API_KEY`, but Google Books API rate limits will apply._

### 2. Local Node.js Development

If you have a local MongoDB service running on your machine:

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 3. Docker Compose Run

You can spin up the entire stack (Next.js app + MongoDB instance) containerized without having to configure local databases:

```bash
# Build and run the docker containers
docker compose up --build
```

This starts:

- **web**: Next.js application exposed on [http://localhost:3000](http://localhost:3000)
- **db**: MongoDB service bound to port `27017`

---

## Features

- **Real-Time Search**: Queries Google Books API dynamically using `@tanstack/react-query` to handle caching and search state.
- **Wishlist Actions**: Save books directly into a MongoDB collection using Next.js Server Actions. Wishlist cache is invalidated instantly on updates.
- **Detailed Dialog Modal**: Shows complete book metadata (ISBN, publisher, page count, categories, availability, print format, web reader links) inside a clean dialog modal.
- **Refined Theme Toggles**: Easily switch between Light and Dark mode using the button on the landing page and navigation header.
- **Skeleton Layouts**: Card skeleton loaders replace basic spinners to make page query states feel smooth and native.
