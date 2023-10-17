"use client";

import { ComponentProps, ReactNode, useEffect } from "react";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Search, { MapSearchProps } from "./Search";

import "leaflet/dist/leaflet.css";

type MarkerProps = ComponentProps<typeof Marker> & {
  popup?: ReactNode;
};

export type DynamicMapProps = ComponentProps<typeof MapContainer> & {
  children?: ReactNode | ((arg: any) => ReactNode);
  width?: number;
  height?: number;
  markers?: MarkerProps[];
  search?: MapSearchProps;
};

const Map = ({ children, width, height, markers, search, ...rest }: DynamicMapProps) => {
  useEffect(() => {
    (async function init() {
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
        iconUrl: "/leaflet/images/marker-icon.png",
        shadowUrl: "/leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer style={{ width: "100%", height: "100%", zIndex: 0 }} {...rest}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers?.map((marker, idx) => (
        <Marker key={`marker-${idx}`} {...marker}>
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Marker>
      ))}
      <Search data={search?.data} />
    </MapContainer>
  );
};

export default Map;
