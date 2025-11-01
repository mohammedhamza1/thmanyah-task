import type { ItunesSearchResult } from "@/models/itunes-search-result.model";
import { ArtworkImage } from "./artwork-image";
import { MenuButton } from "./menu-button";

interface EpisodeItemProps {
  episode: ItunesSearchResult;
  index: number;
}

export function EpisodeItem({ episode, index }: EpisodeItemProps) {
  return (
    <div
      key={`${episode.trackId}-${index}`}
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-900 transition-colors cursor-pointer group"
    >
      <div className="flex-shrink-0">
        <ArtworkImage
          result={episode}
          size={64}
          className="w-16 h-16 rounded-md object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate mb-1">
          {episode.trackName}
        </h3>
        <p className="text-sm text-gray-400 truncate">
          {episode.collectionName || episode.artistName}
        </p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <MenuButton size={20} className="text-gray-500 hover:text-white" />
      </div>
    </div>
  );
}
