import type { ItunesSearchResult } from "@/models/itunes-search-result.model";

interface ITunesApiItem {
  trackId: number;
  trackName?: string;
  artistName?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  collectionName?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  feedUrl?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  country?: string;
  [key: string]: unknown;
}

export function mapITunesApiItemToResult(
  item: ITunesApiItem
): ItunesSearchResult {
  return {
    trackId: item.trackId,
    trackName: item.trackName || "",
    artistName: item.artistName || "",
    artworkUrl100: item.artworkUrl100,
    artworkUrl600: item.artworkUrl600,
    collectionName: item.collectionName,
    collectionViewUrl: item.collectionViewUrl,
    trackViewUrl: item.trackViewUrl,
    feedUrl: item.feedUrl,
    genre: item.primaryGenreName,
    releaseDate: item.releaseDate,
    country: item.country,
  };
}
