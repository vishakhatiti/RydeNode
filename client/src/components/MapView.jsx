import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import GlassCard from "./GlassCard";

const token = process.env.REACT_APP_MAPBOX_TOKEN;

function MapView({ pickup = [77.5946, 12.9716], destination = [77.64, 12.99], driver = [77.61, 12.98] }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!token || mapRef.current || !containerRef.current) return undefined;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: pickup,
      zoom: 12
    });

    const addMarker = (coords, color) => new mapboxgl.Marker({ color }).setLngLat(coords).addTo(map);

    addMarker(pickup, "#2E8BFF");
    addMarker(destination, "#8A2BE2");
    addMarker(driver, "#00E0A4");

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [pickup, driver, destination]
          }
        }
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        paint: {
          "line-color": "#2E8BFF",
          "line-width": 4,
          "line-opacity": 0.8
        }
      });
    });

    mapRef.current = map;
    return () => map.remove();
  }, [pickup, destination, driver]);

  if (!token) {
    return (
      <GlassCard className="h-72">
        <p className="text-sm text-gray-300">Map preview is enabled when REACT_APP_MAPBOX_TOKEN is configured.</p>
      </GlassCard>
    );
  }

  return <div ref={containerRef} className="h-72 w-full overflow-hidden rounded-2xl border border-white/20" aria-label="Ride map view" />;
}

export default MapView;
