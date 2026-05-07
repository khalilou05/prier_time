"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGeo } from "@/context/GeoProvider";

export default function Home() {
  const { country, latitude, longitude, city } = useGeo();
  return (
    <div>
      <SidebarTrigger />
      <p>Country: {country}</p>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>City: {decodeURI(city)}</p>
    </div>
  );
}
