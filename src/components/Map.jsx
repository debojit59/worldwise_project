import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Twemoji from "react-twemoji";
import { UseCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useLocation";
import Button from "./Button";
import ChangeCenter from "./ChangeCenter";
import styles from "./Map.module.css";
import DetectClick from "./UseMap";

function Map() {
  const { cities } = UseCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([30, 40]);
  const {
    isloading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const { id } = useParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // const city = cities.find((city) => city.id === id);
  const Navigate = useNavigate();

  useEffect(
    function () {
      if ((lat, lng)) setMapPosition([lat, lng]);
    },
    [lat, lng],
  );

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "loading" : "use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          const location = [city.position.lat, city.position.lng];

          return (
            <Marker
              position={location}
              key={city.id}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                },
              }}
            >
              <Popup>
                <span>
                  <Twemoji>{city.emoji}</Twemoji>
                </span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
