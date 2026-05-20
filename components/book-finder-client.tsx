"use client"

import { InputSearch } from "@/components/input-search"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Heart, Library, Moon, Search, Sun } from "lucide-react"

import { useRouter } from "nextjs-toploader/app"
import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getBooks, getWishlist, toggleWishlist } from "@/app/actions"
import { useTheme } from "next-themes"

import type { GoogleBookItem } from "@/lib/types"
import { BookCard } from "@/components/book-card"
import { BookDetailDialog } from "@/components/book-detail-dialog"

type Tab = "search" | "wishlist"

function BookCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground">
      <div className="aspect-square w-full bg-muted/30 sm:aspect-4/5" />
      <div className="flex flex-1 flex-col space-y-3 p-4">
        <div className="h-3 w-20 rounded-sm bg-muted/50" />
        <div className="space-y-1.5">
          <div className="h-4 w-[90%] rounded-md bg-muted/50" />
          <div className="h-4 w-[60%] rounded-md bg-muted/50" />
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
          <div className="h-3.5 w-16 rounded-md bg-muted/35" />
          <div className="h-3.5 w-14 rounded-md bg-muted/35" />
        </div>
      </div>
    </div>
  )
}

export function BookFinderClient({ search }: { search: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<Tab>("search")
  const [inputValue, setInputValue] = useState(search)
  const [selectedBook, setSelectedBook] = useState<GoogleBookItem | null>(null)

  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  const { data, isLoading } = useQuery({
    queryKey: ["books", search],
    queryFn: () => getBooks(search),
    enabled: !!search,
  })

  const { data: wishlistData = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlist(),
  })

  const toggleMutation = useMutation({
    mutationFn: toggleWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] })
    },
  })

  const wishlistIds = new Set(wishlistData.map((item) => item.id))
  const isWishlisted = (id: string) => wishlistIds.has(id)

  const submitSearch = (query: string) => {
    if (query.trim()) {
      setActiveTab("search")
      router.push(`/?q=${encodeURIComponent(query.trim())}`)
    }
  }

  if (!search) {
    return (
      <div className="relative flex min-h-svh flex-col items-center justify-center bg-background p-6">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <button
            onClick={toggleTheme}
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground transition-colors hover:bg-muted"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex w-full max-w-lg flex-col items-center space-y-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
              <Library size={32} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
                BookFinder
              </h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Discover your next read
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submitSearch(inputValue)
            }}
            className="w-full"
          >
            <InputSearch
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onSubmit={() => submitSearch(inputValue)}
            />
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Trending:</span>
            {["Education", "Finance", "Business", "Technology"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setInputValue(tag)
                  submitSearch(tag)
                }}
                className="rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-foreground transition-colors hover:bg-muted"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setInputValue("")
                router.push("/")
              }}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary transition-opacity hover:opacity-90"
            >
              <Library size={18} className="text-primary-foreground" />
            </button>
            <div>
              <h1 className="text-base leading-none font-bold tracking-tight">
                BookFinder
              </h1>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Discover your next read
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border/50 bg-muted/50 p-0.5">
              <button
                onClick={() => setActiveTab("search")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === "search"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Search size={14} />
                <span className="hidden sm:inline">Search</span>
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  activeTab === "wishlist"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Heart size={14} />
                <span className="hidden sm:inline">Wishlist</span>

                <Badge className="ml-0.5 h-5 min-w-5 justify-center bg-destructive px-1.5 text-[10px]">
                  {wishlistData.length}
                </Badge>
              </button>
            </div>

            <button
              onClick={toggleTheme}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background text-foreground transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        {activeTab === "search" ? (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitSearch(inputValue)
              }}
              className="w-full"
            >
              <InputSearch
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSubmit={() => submitSearch(inputValue)}
              />
            </form>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <BookCardSkeleton key={idx} />
                ))}
              </div>
            ) : data?.items && data.items.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {data.items.map((item) => (
                  <BookCard
                    key={item.id}
                    item={item}
                    isWishlisted={isWishlisted(item.id)}
                    isPending={toggleMutation.isPending}
                    onWishlistToggle={() => toggleMutation.mutate(item)}
                    onViewDetails={() => setSelectedBook(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-20 text-center">
                <span className="text-lg font-semibold">No books found</span>
                <span className="text-sm text-muted-foreground">
                  Try searching with different terms or check your spelling.
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold tracking-tight">
                Your Wishlist
              </h2>
              <p className="text-xs text-muted-foreground">
                Books you have saved to read later.
              </p>
            </div>

            {wishlistData.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {wishlistData.map((item) => (
                  <BookCard
                    key={item.id}
                    item={item}
                    isWishlisted={true}
                    isPending={toggleMutation.isPending}
                    onWishlistToggle={() => toggleMutation.mutate(item)}
                    onViewDetails={() => setSelectedBook(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 py-20 text-center">
                <span className="text-lg font-semibold">
                  Your wishlist is empty
                </span>
                <span className="text-sm text-muted-foreground">
                  Explore books using search and add them to your wishlist.
                </span>
              </div>
            )}
          </>
        )}
      </main>

      <BookDetailDialog
        book={selectedBook}
        isOpen={!!selectedBook}
        onOpenChange={(open) => !open && setSelectedBook(null)}
        isWishlisted={selectedBook ? isWishlisted(selectedBook.id) : false}
        onWishlistToggle={() =>
          selectedBook && toggleMutation.mutate(selectedBook)
        }
        isPending={toggleMutation.isPending}
      />
    </div>
  )
}
