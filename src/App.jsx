import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Citylist from "./components/CitiesList";
import City from "./components/City";
import Countrylist from "./components/CountryList";
import From from "./components/Form";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const HandleDelete = (id) => {
    setCities((city) => city.filter((city) => city.id !== id));
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout cities={cities} />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route
              path="cities"
              element={
                <Citylist
                  cities={cities}
                  isLoading={isLoading}
                  HandleDelete={HandleDelete}
                />
              }
            />
            <Route path="cities/:id" element={<City />} />
            <Route
              path="countries"
              element={<Countrylist cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<From />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
