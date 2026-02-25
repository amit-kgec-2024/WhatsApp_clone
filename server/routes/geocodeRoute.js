import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/geocode", async (req, res) => {
  try {
    const { address } = req.query;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          "User-Agent": "school-transport-app",
        },
      }
    );

    const data = await response.json();

    if (data.length > 0) {
      return res.json({
        lat: data[0].lat,
        lng: data[0].lon,
      });
    }

    res.status(404).json({ message: "Location not found" });
  } catch (error) {
    res.status(500).json({ message: "Geocoding failed" });
  }
});

export default router;
