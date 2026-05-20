import { Star } from "lucide-react"

export function Rating({ rate }: { rate: number }) {
  const stars = []
  for (let i = 0; i < 5; i++) {
    const fillPercentage = Math.max(0, Math.min(100, (rate - i) * 100))
    stars.push(
      <div key={i} className="relative h-4 w-4">
        <Star className="absolute top-0 left-0 h-4 w-4 fill-muted-foreground/20 text-muted-foreground/20" />
        <div
          className="absolute top-0 left-0 h-4 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star className="h-4 w-4 max-w-none fill-yellow-500 text-yellow-500" />
        </div>
      </div>
    )
  }
  return <div className="flex items-center gap-0.5">{stars}</div>
}
