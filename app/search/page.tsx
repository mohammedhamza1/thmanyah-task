"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const term = searchParams.get("term");
  const [search, setSearch] = useState(term || "");

  const handleSearch = async (searchTerm: string) => {
    const response = await fetch(
      `/api/search?term=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    console.log(data.results);
  };

  useEffect(() => {
    if (term) {
      handleSearch(term);
    }
  }, [term]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => handleSearch(search)}>Search</button>
    </div>
  );
};

export default SearchPage;
