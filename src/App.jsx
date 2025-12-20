import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Citylist from "./components/CitiesList";
import City from "./components/City";
import Countrylist from "./components/CountryList";
import From from "./components/Form";
import { ContextProvider } from "./contexts/CityContext";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="product" element={<Product />} />
            <Route path="/" element={<HomePage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate to="cities" replace />} />
              <Route path="cities" element={<Citylist />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<Countrylist />} />
              <Route path="form" element={<From />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
