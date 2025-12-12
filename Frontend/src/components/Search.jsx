// src/components/Search.jsx
import { useState, useEffect } from "react";
import Hero from "./hero"; // make sure the filename matches
import axios from "axios";

const Search = ({ keyword }) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword || keyword.trim() === "") {
      // You could clear or optionally fetch curated here
      setResult([]);
      return;
    }

    const controller = new AbortController();
    const fetchResults = async () => {
      setIsLoading(true);
      setError("");
      try {
        const resp = await axios.post(
          "http://localhost:3001/search",
          {
            keyword,
            page: 1,
            per_page: 80,
          },
          {
            signal: controller.signal,
          }
        );

        // The backend returns Pexels data
        setResult(resp.data.photos || []);
      } catch (err) {
        if (axios.isCancel(err)) {
          // request was canceled
          return;
        }
        console.error("Search error:", err);
        setError("Failed to fetch photos.");
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();

    return () => controller.abort();
  }, [keyword]);

  if (isLoading) return <Hero text="Loading..." />;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="d-flex justify-content-evenly flex-wrap" style={{ gap: 12 }}>
      {result.length === 0 && <p>No results for “{keyword}”.</p>}

      {result.map((photo) => (
        <img
          key={photo.id}
          className="img-fluid img-thumbnail"
          src={photo.src.large2x}
          alt={photo.alt || "photo"}
          style={{ maxWidth: 320, height: "auto", margin: 8 }}
          loading="lazy"
        />
      ))}
    </div>
  );
};

export default Search;
