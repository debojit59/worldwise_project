import CityItems from "./CityItems";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

export default function Citylist({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItems city={city} key={city.id} />
      ))}
    </ul>
  );
}
