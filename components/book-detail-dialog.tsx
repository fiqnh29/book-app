"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Rating } from "@/components/rating"
import { Heart, Library } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { GoogleBookItem } from "@/lib/types"

interface BookDetailDialogProps {
  book: GoogleBookItem | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isWishlisted: boolean
  onWishlistToggle: () => void
  isPending: boolean
}

export function BookDetailDialog({
  book,
  isOpen,
  onOpenChange,
  isWishlisted,
  onWishlistToggle,
  isPending,
}: BookDetailDialogProps) {
  if (!book) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] gap-6 overflow-y-auto rounded-2xl p-6 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl leading-tight font-bold tracking-tight text-foreground">
            {book.volumeInfo.title}
          </DialogTitle>
          {book.volumeInfo.authors && (
            <DialogDescription className="mt-1 text-sm font-medium text-muted-foreground">
              by {book.volumeInfo.authors.join(", ")}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[160px_1fr]">
          <div className="flex flex-col gap-4">
            {book.volumeInfo.imageLinks?.thumbnail ? (
              <div className="relative mx-auto flex aspect-3/4 w-full max-w-40 items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-muted/20 p-3 shadow-md">
                <div
                  className="absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-2xl"
                  style={{
                    backgroundImage: `url(${book.volumeInfo.imageLinks.thumbnail})`,
                  }}
                />
                <div className="relative h-[90%] w-[90%] drop-shadow-md">
                  <Image
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    fill
                    sizes="160px"
                    className="rounded-sm object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="mx-auto flex aspect-3/4 w-full max-w-40 flex-col items-center justify-center gap-2 rounded-lg border border-border/50 bg-muted/20 text-muted-foreground">
                <Library size={32} strokeWidth={1} />
                <span className="text-[10px]">No Cover</span>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-1.5">
              {book.volumeInfo.language && (
                <Badge
                  variant="secondary"
                  className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase"
                >
                  {book.volumeInfo.language}
                </Badge>
              )}
              {book.volumeInfo.printType && (
                <Badge
                  variant="secondary"
                  className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase"
                >
                  {book.volumeInfo.printType}
                </Badge>
              )}
              {book.volumeInfo.maturityRating && (
                <Badge
                  variant={
                    book.volumeInfo.maturityRating === "MATURE"
                      ? "destructive"
                      : "outline"
                  }
                  className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase"
                >
                  {book.volumeInfo.maturityRating.replace("_", " ")}
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {book.volumeInfo.averageRating && (
              <div className="flex items-center gap-2">
                <Rating rate={book.volumeInfo.averageRating} />
                <span className="text-sm font-bold text-foreground">
                  {book.volumeInfo.averageRating} / 5
                </span>
                <span className="text-xs text-muted-foreground">
                  ({book.volumeInfo.ratingsCount} reviews)
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border/40 py-3.5 text-xs">
              {book.volumeInfo.publisher && (
                <div>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    Publisher
                  </span>
                  <span className="font-semibold text-foreground">
                    {book.volumeInfo.publisher}
                  </span>
                </div>
              )}
              {book.volumeInfo.publishedDate && (
                <div>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    Published Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {book.volumeInfo.publishedDate}
                  </span>
                </div>
              )}
              {book.volumeInfo.pageCount && (
                <div>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    Pages
                  </span>
                  <span className="font-semibold text-foreground">
                    {book.volumeInfo.pageCount} pages
                  </span>
                </div>
              )}
              {book.volumeInfo.categories &&
                book.volumeInfo.categories.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-medium text-muted-foreground">
                      Categories
                    </span>
                    <span className="font-semibold text-foreground">
                      {book.volumeInfo.categories.join(", ")}
                    </span>
                  </div>
                )}
              {book.volumeInfo.industryIdentifiers &&
                book.volumeInfo.industryIdentifiers.length > 0 && (
                  <div className="col-span-2">
                    <span className="block text-[10px] font-medium text-muted-foreground">
                      Identifiers
                    </span>
                    <span className="flex gap-3 font-mono text-[11px] font-semibold text-foreground">
                      {book.volumeInfo.industryIdentifiers.map((id) => (
                        <span key={id.identifier}>
                          {id.type}: {id.identifier}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              {book.saleInfo && (
                <div>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    Availability
                  </span>
                  <span className="font-semibold text-foreground">
                    {book.saleInfo.saleability === "NOT_FOR_SALE"
                      ? "Not for Sale"
                      : "Available"}
                    {book.saleInfo.isEbook && " (eBook)"}
                  </span>
                </div>
              )}
              {book.accessInfo && (
                <div>
                  <span className="block text-[10px] font-medium text-muted-foreground">
                    Formats
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-foreground">
                    {book.accessInfo.epub?.isAvailable ? "EPUB" : ""}
                    {book.accessInfo.epub?.isAvailable &&
                    book.accessInfo.pdf?.isAvailable
                      ? " & "
                      : ""}
                    {book.accessInfo.pdf?.isAvailable ? "PDF" : ""}
                    {!book.accessInfo.epub?.isAvailable &&
                    !book.accessInfo.pdf?.isAvailable
                      ? "No digital copies"
                      : ""}
                  </span>
                </div>
              )}
            </div>

            {book.volumeInfo.description && (
              <div className="space-y-1">
                <span className="block text-xs font-semibold text-muted-foreground">
                  About this book
                </span>
                <p className="max-h-48 overflow-y-auto pr-1 text-xs leading-relaxed text-muted-foreground">
                  {book.volumeInfo.description}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={onWishlistToggle}
                disabled={isPending}
                className={cn(
                  "inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-xs transition-colors hover:scale-105 active:scale-95",
                  isWishlisted
                    ? "border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/15"
                    : "border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                <Heart
                  size={13}
                  className={isWishlisted ? "fill-destructive" : ""}
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>

              {book.volumeInfo.previewLink && (
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  Preview Book
                </a>
              )}
              {book.volumeInfo.infoLink && (
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  Google Books Info
                </a>
              )}
              {book.accessInfo?.webReaderLink && (
                <a
                  href={book.accessInfo.webReaderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-opacity hover:opacity-90"
                >
                  Read Online
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
