import Styles from "./CityItem.module.css";
export default function CityItems({ city, HandleDelete }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  const { cityName, date, emoji, id } = city;
  return (
    <li className={Styles.cityItem}>
      <span className={Styles.emoji}>{emoji}</span>
      <h3 className={Styles.name}>{cityName}</h3>
      <time className={Styles.date}>({formatDate(date)})</time>
      <button className={Styles.deleteBtn} onClick={() => HandleDelete(id)}>
        &times;
      </button>
    </li>
  );
}
