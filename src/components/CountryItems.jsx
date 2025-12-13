import Twemoji from "react-twemoji";
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Twemoji className={styles.twemoji}>
        <span>{country.emoji}</span>
      </Twemoji>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
