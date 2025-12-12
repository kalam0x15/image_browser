import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const PEXELS_KEY = process.env.PEXELS_KEY;
if (!PEXELS_KEY) {
  console.error("Missing PEXELS_KEY in .env — exiting");
  process.exit(1);
}

const pexels = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: { Authorization: PEXELS_KEY },
  timeout: 10000,
});

// ——————————————————————————————
// 📌 Curated photos endpoint
// POST /
// body: { details: { page, per_page } }
// ——————————————————————————————
app.post("/", async (req, res) => {
  const { details } = req.body || {};

  if (!details) {
    return res.status(400).json({ error: "Missing details object" });
  }

  const { page = 1, per_page = 80 } = details;

  try {
    const response = await pexels.get("/curated", {
      params: { page, per_page },
    });
    console.log(`Curated: page=${page}, per_page=${per_page}`);
    return res.json(response.data);
  } catch (err) {
    console.error("Pexels error (curated):", err.message);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: "Pexels fetch failed" };
    return res.status(status).json(data);
  }
});

// ——————————————————————————————
// 📌 Search endpoint
// POST /search
// body: { keyword, page, per_page }
// ——————————————————————————————
app.post("/search", async (req, res) => {
  const { keyword = "", page = 1, per_page = 80 } = req.body || {};

  if (typeof keyword !== "string") {
    return res.status(400).json({ error: "keyword must be a string" });
  }

  try {
    const response = await pexels.get("/search", {
      params: {
        query: keyword.trim(),
        page,
        per_page,
      },
    });

    console.log(`Search: "${keyword}", page=${page}, per_page=${per_page}`);
    return res.json(response.data);
  } catch (err) {
    console.error("Pexels error (search):", err.message);
    const status = err.response?.status || 500;
    const data = err.response?.data || { error: "Pexels fetch failed" };
    return res.status(status).json(data);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
