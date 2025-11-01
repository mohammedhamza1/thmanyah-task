import { NextResponse } from "next/server";
import { mapITunesApiItemToResult } from "@/mapper/itunes-search.mapper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term");

  if (!term) {
    return NextResponse.json(
      { error: "Search term is required" },
      { status: 400 }
    );
  }

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    term
  )}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`iTunes API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results.map(mapITunesApiItemToResult);

    return NextResponse.json({
      resultCount: results.length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to search iTunes API",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
