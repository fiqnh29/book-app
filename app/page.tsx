import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
import { getBooks } from "@/app/actions"
import { BookFinderClient } from "@/components/book-finder-client"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const q = params.q || ""
  const queryClient = new QueryClient()

  if (q) {
    await queryClient.prefetchQuery({
      queryKey: ["books", q],
      queryFn: () => getBooks(q),
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BookFinderClient search={q} />
    </HydrationBoundary>
  )
}
