import { useMapEvent } from "react-leaflet";
import { useNavigate } from "react-router-dom";

export default function DetectClick() {
  const Navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      console.log(e);
      Navigate(`form?&lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
