import { useMap } from "react-leaflet";

export default function ChangeCenter({ position }) {
  const Map = useMap();
  Map.setView(position);
  return null;
}
