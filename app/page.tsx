"use client";

import { useState, useEffect } from "react";
import type { ItunesSearchResult } from "@/models/itunes-search-result.model";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "@/components/section-header";
import { PodcastCard } from "@/components/podcast-card";
import { EpisodeItem } from "@/components/episode-item";

export default function Home() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const [searchTerm, setSearchTerm] = useState(term || "");
  const [podcasts, setPodcasts] = useState<ItunesSearchResult[]>([]);
  const [episodes, setEpisodes] = useState<ItunesSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?term=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      setPodcasts(data.podcasts || []);
      setEpisodes((data.episodes || []).slice(0, 18));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (term) {
      handleSearch(term);
    }
  }, [term]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="w-full px-8 py-8">
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search podcasts and episodes..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-gray-700"
            />
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Searching...</p>
          </div>
        )}

        {!loading && (podcasts.length > 0 || episodes.length > 0) && (
          <div className="space-y-12">
            {podcasts.length > 0 && (
              <section>
                <SectionHeader title={`Top podcasts for ${searchTerm}`} />

                <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                  {podcasts.map((podcast, index) => (
                    <PodcastCard
                      key={`${podcast.trackId}-${index}`}
                      podcast={podcast}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {episodes.length > 0 && (
              <section>
                <SectionHeader title={`Top episodes for ${searchTerm}`} />

                <div className="grid grid-cols-3 auto-rows-max gap-x-6 gap-y-3">
                  {episodes.map((episode, index) => (
                    <EpisodeItem
                      key={`${episode.trackId}-${index}`}
                      episode={episode}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {!loading && !podcasts.length && !episodes.length && searchTerm && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No results found</p>
          </div>
        )}

        {!loading && !podcasts.length && !episodes.length && !searchTerm && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Search for podcasts to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
