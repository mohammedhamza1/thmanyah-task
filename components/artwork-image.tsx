import Image from "next/image";
import type { ItunesSearchResult } from "@/models/itunes-search-result.model";

interface ArtworkImageProps {
  result: ItunesSearchResult;
  size: number;
  className?: string;
}

export function ArtworkImage({
  result,
  size,
  className = "",
}: ArtworkImageProps) {
  const src =
    result.artworkUrl600 ||
    result.artworkUrl100 ||
    "/placeholder.png";

  return (
    <Image
      src={src}
      alt={result.trackName}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

