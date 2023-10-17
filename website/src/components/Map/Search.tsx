"use client";

/* @ts-ignore */
import LeafletSearch from "leaflet-search";
import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";

import "leaflet-search/dist/leaflet-search.min.css";

type LayerProps = {
  position: [number, number];
  title: string;
  popup?: string;
};

export type MapSearchProps = {
  data?: LayerProps[];
};
const Search = ({ data = [] }: MapSearchProps) => {
  const map = useMap();

  useEffect(() => {
    const markersLayer = new L.LayerGroup();
    for (const i in data) {
      const title = data[i].title;
      const [lat, long] = data[i].position;

      const marker = new L.Marker(new L.LatLng(lat, long), { title });
      marker.bindPopup("Pos: " + title);
      markersLayer.addLayer(marker);
    }

    const searchControl = new LeafletSearch({
      position: "topright",
      zoom: 16,
      marker: false,
      layer: markersLayer,
      textPlaceholder: "Cari Lokasi",
    });

    map.addLayer(markersLayer);
    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [data, map]);

  return null;
};

export default Search;
