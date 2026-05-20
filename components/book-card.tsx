"use client"

import { BookOpen, Heart, Library } from "lucide-react"
import { Rating } from "@/components/rating"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import type { GoogleBookItem } from "@/lib/types"

interface BookCardProps {
  item: GoogleBookItem
  isWishlisted: boolean
  onWishlistToggle: () => void
  onViewDetails: () => void
  isPending: boolean
}

export function BookCard({
  item,
  isWishlisted,
  onWishlistToggle,
  onViewDetails,
  isPending,
}: BookCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-muted/20 sm:aspect-4/5">
        {item.volumeInfo.imageLinks?.thumbnail ? (
          <>
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center opacity-50 blur-2xl"
              style={{
                backgroundImage: `url(${item.volumeInfo.imageLinks.thumbnail})`,
              }}
            />
            <div className="relative h-[85%] w-[65%] drop-shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <Image
                src={item.volumeInfo.imageLinks.thumbnail}
                alt={item.volumeInfo.title}
                fill
                loading="eager"
                className="rounded-sm object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Library size={32} strokeWidth={1} />
            <span className="text-[10px]">No Cover Available</span>
          </div>
        )}

        {item.volumeInfo.categories?.[0] && (
          <Badge className="absolute top-3 left-3 rounded-full border border-border/40 bg-background/85 px-2 py-0.5 text-[9px] font-medium text-foreground shadow-xs backdrop-blur-md hover:bg-background">
            {item.volumeInfo.categories[0]}
          </Badge>
        )}

        <button
          type="button"
          onClick={onWishlistToggle}
          disabled={isPending}
          className={cn(
            "absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-border/40 bg-background/85 shadow-xs backdrop-blur-md transition-all hover:scale-105 hover:bg-background active:scale-95",
            isWishlisted
              ? "text-destructive"
              : "text-muted-foreground hover:text-destructive"
          )}
        >
          <Heart size={13} className={isWishlisted ? "fill-destructive" : ""} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-1.5">
          {item.volumeInfo.averageRating ? (
            <div className="flex items-center gap-1.5">
              <Rating rate={item.volumeInfo.averageRating} />
              <span className="text-xs font-semibold text-foreground">
                {item.volumeInfo.averageRating}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({item.volumeInfo.ratingsCount})
              </span>
            </div>
          ) : (
            <span className="text-[10px] text-muted-foreground/60 italic">
              No ratings
            </span>
          )}
        </div>

        <h3
          className="mt-2 line-clamp-2 text-sm leading-tight font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary"
          title={item.volumeInfo.title}
        >
          {item.volumeInfo.title}
        </h3>

        <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
          {item.volumeInfo.authors
            ? item.volumeInfo.authors.join(", ")
            : "Unknown Author"}
        </p>

        {(item.volumeInfo.publisher || item.volumeInfo.publishedDate) && (
          <p className="mt-1 line-clamp-1 text-[10px] text-muted-foreground/75">
            {item.volumeInfo.publisher && (
              <span>{item.volumeInfo.publisher} • </span>
            )}
            <span>{item.volumeInfo.publishedDate?.split("-")[0]}</span>
          </p>
        )}

        {item.volumeInfo.description && (
          <p className="mt-2.5 line-clamp-2 text-[11px] leading-normal text-muted-foreground/80">
            {item.volumeInfo.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen size={11} />
            {item.volumeInfo.pageCount
              ? `${item.volumeInfo.pageCount} pages`
              : "N/A pages"}
          </span>
          <button
            onClick={onViewDetails}
            className="text-[10px] font-semibold text-primary transition-all hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
