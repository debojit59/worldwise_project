import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UseCities } from "../contexts/CityContext";
import styles from "./Map.module.css";

export default function Map() {
  const { cities } = UseCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [position, setPosition] = useState([51.505, -0.09]);

  const city = cities.find((city) => city.id === id);
  const Navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => Navigate("form")}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
