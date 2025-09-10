import { Star } from "lucide-react";
import React from "react";

export default function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < full
              ? "fill-yellow-500 stroke-yellow-500"
              : half && i === full
                ? "fill-yellow-500/60 stroke-yellow-500/60"
                : "stroke-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}
