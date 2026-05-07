"use client";
import { headers } from "next/dist/server/request/headers";
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
  const header = use(headers());
  const geo = {
    latitude: parseFloat(header.get("x-vercel-ip-latitude") || "0"),
    longitude: parseFloat(header.get("x-vercel-ip-longitude") || "0"),
    city: header.get("x-vercel-ip-city") || "Unknown",
    country: header.get("x-vercel-ip-country") || "Unknown",
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
