import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { UseCities } from "../contexts/CityContext";
import styles from "./Map.module.css";

export default function Map() {
  const { cities } = UseCities();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const city = cities.find((city) => city.id === id);
  const Navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => Navigate("form")}>
      {city ? (
        <>
          <h3>{city.country}</h3>
          <p>lat: {lat}</p>
          <p>lng: {lng}</p>
        </>
      ) : (
        <p>Select a city from the list</p>
      )}
    </div>
  );
}
