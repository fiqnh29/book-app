import mongoose, { Document, Schema } from "mongoose"
import type { GoogleBookItem } from "@/lib/types"

export interface IWishlist extends Document {
  id: string
  volumeInfo: GoogleBookItem["volumeInfo"]
  saleInfo?: GoogleBookItem["saleInfo"]
  accessInfo?: GoogleBookItem["accessInfo"]
  searchInfo?: GoogleBookItem["searchInfo"]
}

const WishlistSchema = new Schema<IWishlist>(
  {
    id: { type: String, required: true, unique: true },
    volumeInfo: {
      title: { type: String, required: true },
      authors: [String],
      publishedDate: String,
      description: String,
      industryIdentifiers: [
        {
          type: { type: String },
          identifier: { type: String },
        },
      ],
      readingModes: {
        text: Boolean,
        image: Boolean,
      },
      pageCount: Number,
      printType: String,
      categories: [String],
      maturityRating: String,
      allowAnonLogging: Boolean,
      contentVersion: String,
      language: String,
      previewLink: String,
      infoLink: String,
      canonicalVolumeLink: String,
      imageLinks: {
        smallThumbnail: String,
        thumbnail: String,
      },
      averageRating: Number,
      ratingsCount: Number,
      publisher: String,
    },
    saleInfo: Schema.Types.Mixed,
    accessInfo: Schema.Types.Mixed,
    searchInfo: Schema.Types.Mixed,
  },
  { timestamps: true }
)

export const Wishlist =
  mongoose.models.Wishlist ||
  mongoose.model<IWishlist>("Wishlist", WishlistSchema)
