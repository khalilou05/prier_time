"use client";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
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
  promise,
}: {
  children: React.ReactNode;
  promise: Promise<ReadonlyHeaders>;
}) {
  const headers = use(promise);
  const geo = {
    latitude: parseFloat(headers.get("x-vercel-ip-latitude") || "0"),
    longitude: parseFloat(headers.get("x-vercel-ip-longitude") || "0"),
    city: headers.get("x-vercel-ip-city") || "Unknown",
    country: headers.get("x-vercel-ip-country") || "Unknown",
  };
  return <Provider value={geo}>{children}</Provider>;
}

export function useGeo() {
  const geo = use(Provider);
  if (!geo) {
    throw new Error("useGeo must be used within a GeoProvider");
  }
  return geo;
}
