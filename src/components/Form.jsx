// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import Twemoji from "react-twemoji";
import useUrlPosition from "../hooks/useUrlPosition";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import Message from "./Message";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { UseCities } from "../contexts/CityContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeoCodingError] = useState("");
  const { createCity, isLoading } = UseCities();

  const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

  const Navigate = useNavigate();
  // if (!lat && !lng) return;

  useEffect(
    function () {
      async function fetchCityData() {
        try {
          setGeoCodingError("");
          setIsLoadingGeocoding(true);
          const res = await fetch(`${BaseUrl}latitude=${lat}&longitude=${lng}`);
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              "this doesnt seem to be a city .. try with a different location ",
            );
          setCityName(data.city || data.locality || data.plusCode);
          setCountry(data.country);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng],
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      date,
      emoji,
      country,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    Navigate("/app/cities");
  }

  if (geocodingError) return <Message message={geocodingError} />;
  if (!lat && !lng) return <Message message="start by clicking on the map" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <Twemoji className={styles.twemoji}>{emoji}</Twemoji>
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
