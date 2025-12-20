import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();

function ContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  // TEMP DATA

  const BaseUrl = "http://localhost:9000";

  useEffect(function () {
    async function FetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BaseUrl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error while fetching the data");
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, []);

  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  async function GetCity(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BaseUrl}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("Error Found");
    } finally {
      setIsLoading(false);
    }
  }

  const HandleDelete = (id) => {
    setCities((city) => city.filter((city) => city.id !== id));
  };

  return (
    <CityContext.Provider
      value={{ HandleDelete, cities, isLoading, currentCity, GetCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

function UseCities() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error(
      "context is being called from the outside parent components"
    );
  }
  return context;
}

export { ContextProvider, UseCities };
