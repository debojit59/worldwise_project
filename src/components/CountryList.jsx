import CountryItem from "./CountryItems";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";

export default function Countrylist({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  const Country = cities.reduce((arr, cur) => {
    if (!arr.map((city) => city.country).includes(cur.country)) {
      return [...arr, { country: cur.country, emoji: cur.emoji }];
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {Country.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
