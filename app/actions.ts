"use server"

import axios from "axios"
import type { GoogleBookItem, GoogleBooksResponse } from "@/lib/types"
import { connectToDatabase } from "@/lib/mongodb"
import { Wishlist } from "@/models/wishlist"

export async function getBooks(query: string): Promise<GoogleBooksResponse> {
  const apiUrl = process.env.GOOGLE_BOOKS_API_URL
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY
  const response = await axios.get<GoogleBooksResponse>(apiUrl!, {
    params: {
      q: query,
      key: apiKey,
    },
  })
  return response.data
}

export async function getWishlist(): Promise<GoogleBookItem[]> {
  await connectToDatabase()
  const items = (await Wishlist.find({})
    .sort({ createdAt: -1 })
    .lean()) as unknown as GoogleBookItem[]
  const serialized = items.map((item) => ({
    kind: item.kind || "books#volume",
    id: item.id,
    etag: item.etag || "",
    selfLink: item.selfLink || "",
    volumeInfo: item.volumeInfo,
    saleInfo: item.saleInfo,
    accessInfo: item.accessInfo,
    searchInfo: item.searchInfo,
  }))
  return JSON.parse(JSON.stringify(serialized))
}

export async function toggleWishlist(book: GoogleBookItem): Promise<boolean> {
  await connectToDatabase()
  const existing = await Wishlist.findOne({ id: book.id })
  if (existing) {
    await Wishlist.deleteOne({ id: book.id })
    return false
  } else {
    await Wishlist.create({
      id: book.id,
      kind: book.kind,
      etag: book.etag,
      selfLink: book.selfLink,
      volumeInfo: book.volumeInfo,
      saleInfo: book.saleInfo,
      accessInfo: book.accessInfo,
      searchInfo: book.searchInfo,
    })
    return true
  }
}
