import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import type { ItunesSearchResult } from "@/models/itunes-search-result.model";

const COLLECTION_NAME = "searchResults";

export async function saveSearchResults(
  results: ItunesSearchResult[],
  searchTerm: string
): Promise<ItunesSearchResult[]> {
  const savedResults: ItunesSearchResult[] = [];

  for (const result of results) {
    try {
      const docRef = doc(db, COLLECTION_NAME, result.trackId.toString());
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          ...result,
          searchTerm,
          createdAt: serverTimestamp(),
        });
      }

      savedResults.push(result);
    } catch (error) {
      console.error(`Error saving result ${result.trackId}:`, error);
    }
  }

  return savedResults;
}
