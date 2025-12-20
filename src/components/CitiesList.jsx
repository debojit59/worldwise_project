import { UseCities } from "../contexts/CityContext";
import CityItems from "./CityItems";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

export default function Citylist() {
  const { cities, isLoading } = UseCities();
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItems city={city} key={city.id} />
      ))}
    </ul>
  );
}
