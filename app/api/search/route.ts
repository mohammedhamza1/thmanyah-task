import { NextResponse } from "next/server";
import { mapITunesApiItemToResult } from "@/mapper/itunes-search.mapper";
import { savePodcasts, saveEpisodes } from "@/lib/firestore";

const BASE_URL = "https://itunes.apple.com/search";
const PODCASTS_LIMIT = 22;
const EPISODES_LIMIT = 18;
const MEDIA = "podcast";
const SORT = "recent";

async function searchITunes(
  url: string,
  term: string,
  saveFn: typeof savePodcasts
) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`iTunes API error: ${response.status}`);
      }
      return response.json();
    })
    .then(async (data) => {
      const results = data.results.map(mapITunesApiItemToResult);
      return await saveFn(results, term);
    });
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  const podcastsUrl = `${BASE_URL}?term=${encodeURIComponent(
    term
  )}&media=${MEDIA}&limit=${PODCASTS_LIMIT}&sort=${SORT}`;

  const episodesUrl = `${BASE_URL}?term=${encodeURIComponent(
    term
  )}&media=${MEDIA}&entity=podcastEpisode&limit=${EPISODES_LIMIT}&sort=${SORT}`;

  const podcastsPromise = searchITunes(podcastsUrl, term, savePodcasts);
  const episodesPromise = searchITunes(episodesUrl, term, saveEpisodes);

  return Promise.all([podcastsPromise, episodesPromise])
    .then(([podcasts, episodes]) => {
      return NextResponse.json({ podcasts, episodes });
    })
    .catch((error) => {
      return NextResponse.json(
        {
          error: "Failed to search iTunes API",
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        { status: 500 }
      );
    });
}
