import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  addDoc,
  collection,
} from "firebase/firestore";
import type { ItunesSearchResult } from "@/models/itunes-search-result.model";

const PODCASTS_COLLECTION = "podcasts";
const EPISODES_COLLECTION = "episodes";

async function saveResult(
  result: ItunesSearchResult,
  searchTerm: string,
  collectionName: string
): Promise<void> {
  const data = {
    ...result,
    searchTerm,
    createdAt: serverTimestamp(),
  };

  if (result.trackId && result.trackId > 0) {
    const docRef = doc(db, collectionName, result.trackId.toString());
    return getDoc(docRef).then((docSnap) => {
      if (!docSnap.exists()) {
        return setDoc(docRef, data);
      }
    });
  }

  return addDoc(collection(db, collectionName), data).then(() => undefined);
}

export async function saveSearchResults(
  results: ItunesSearchResult[],
  searchTerm: string,
  collectionName: string = PODCASTS_COLLECTION
): Promise<ItunesSearchResult[]> {
  const savedResults: ItunesSearchResult[] = [];

  return results
    .reduce((promise, result) => {
      return promise
        .then(() => saveResult(result, searchTerm, collectionName))
        .then(() => {
          savedResults.push(result);
        });
    }, Promise.resolve())
    .then(() => savedResults);
}

export async function savePodcasts(
  results: ItunesSearchResult[],
  searchTerm: string
): Promise<ItunesSearchResult[]> {
  return saveSearchResults(results, searchTerm, PODCASTS_COLLECTION);
}

export async function saveEpisodes(
  results: ItunesSearchResult[],
  searchTerm: string
): Promise<ItunesSearchResult[]> {
  return saveSearchResults(results, searchTerm, EPISODES_COLLECTION);
}
