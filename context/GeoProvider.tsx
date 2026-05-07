"use client";

import { createContext, use } from "react";

type GeoMetaData = {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
};

const Provider = createContext<GeoMetaData | null>(null);

export function GeoProvider({
  children,
  geo,
}: {
  children: React.ReactNode;
  geo: GeoMetaData;
}) {
  return <Provider value={geo}>{children}</Provider>;
}

export function useGeo() {
  const geo = use(Provider);
  if (!geo) {
    throw new Error("useGeo must be used within a GeoProvider");
  }
  return geo;
}
