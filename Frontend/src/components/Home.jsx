// src/components/Home.jsx
import { useEffect, useState } from "react";
import Hero from "./hero"; // make sure filename case matches
import axios from "axios";

const Home = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrevClick = () => setCurrentIndex((i) => Math.max(1, i - 1));
  const handleNextClick = () => setCurrentIndex((i) => Math.min(40, i + 1));

  useEffect(() => {
    let mounted = true;
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.post("http://localhost:3001/", {
          details: { page: currentIndex, per_page: 80 },
        });
        if (!mounted) return;
        setResult(resp.data.photos || []);
      } catch (err) {
        console.error("Fetch error:", err);
        if (mounted) setResult([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchPhotos();
    return () => {
      mounted = false;
    };
  }, [currentIndex]); // <--- only re-run when page changes

  // render
  if (isLoading) return <Hero text="Loading..." />;

  return (
    <>
      <div id="Forback_btn" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button className="prev" onClick={handlePrevClick} disabled={isLoading || currentIndex === 1}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <span className="page">{currentIndex}</span>
        <button className="next" onClick={handleNextClick} disabled={isLoading || currentIndex === 40}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="d-flex justify-content-evenly flex-wrap" style={{ gap: 12, marginTop: 12 }}>
        {result.length === 0 && <p>No photos found.</p>}

        {result.map((val) => (
          <img
            key={val.id}
            className="img-fluid img-thumbnail"
            src={val.src?.large2x}
            alt={val.alt || "photo"}
            // preserve aspect ratio: limit width, auto height
            style={{ maxWidth: 320, height: "auto", margin: 6 }}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
};

export default Home;
