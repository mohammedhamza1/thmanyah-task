import type { ItunesSearchResult } from "@/models/itunes-search-result.model";
import { ArtworkImage } from "./artwork-image";
import { MenuButton } from "./menu-button";

interface PodcastCardProps {
  podcast: ItunesSearchResult;
  index: number;
}

export function PodcastCard({ podcast, index }: PodcastCardProps) {
  return (
    <div
      key={`${podcast.trackId}-${index}`}
      className="flex-shrink-0 w-40 group cursor-pointer"
    >
      <div className="mb-3 relative">
        <ArtworkImage
          result={podcast}
          size={400}
          className="w-40 h-40 rounded-md object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base leading-tight truncate mb-1">
            {podcast.trackName}
          </h3>
          <p className="text-xs text-gray-400 truncate">{podcast.artistName}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <MenuButton size={16} className="text-gray-500 hover:text-white" />
        </div>
      </div>
    </div>
  );
}
