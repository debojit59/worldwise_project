import { Link } from "react-router-dom";
import Twemoji from "react-twemoji";
import { UseCities } from "../contexts/CityContext";
import Styles from "./CityItem.module.css";

export default function CityItems({ city }) {
  const { HandleDelete, currentCity } = UseCities();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  const { cityName, date, emoji, id, position } = city;

  return (
    <li>
      <Link
        className={`${Styles.cityItem} ${
          id === currentCity.id ? Styles["cityItem--active"] : ""
        }`}
        to={`${id}?&lat=${position.lat}&lng=${position.lng}`}
      >
        <Twemoji className={Styles.twemoji}>
          <span>{emoji}</span>
        </Twemoji>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>({formatDate(date)})</time>
        <button className={Styles.deleteBtn} onClick={() => HandleDelete(id)}>
          &times;
        </button>
      </Link>
    </li>
  );
}
