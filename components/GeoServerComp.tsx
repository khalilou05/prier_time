import { GeoProvider } from "@/context/GeoProvider";
import { headers } from "next/headers";

export default function GeoServerComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GeoProvider promise={headers()}>{children}</GeoProvider>;
}
