"use client";
import { createContext, use } from "react";

type GeoMetaData = {
  latitude: number;
  longitude: number;
  country: string;
};

const Provider = createContext<GeoMetaData | null>(null);

export function GeoProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GeoMetaData;
}) {
  return <Provider value={value}>{children}</Provider>;
}

export function useGeo() {
  const geo = use(Provider);
  if (!geo) {
    throw new Error("useGeo must be used within a GeoProvider");
  }
  return geo;
}
