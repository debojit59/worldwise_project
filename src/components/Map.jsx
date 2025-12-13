import { useParams, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map({ cities }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const city = cities.filter((city) => city.id === Number(id))[0];

  return (
    <div className={styles.mapContainer}>
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
