import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>List of countries</p>} />
            <Route path="cities" element={<p>List of Cities</p>} />
            <Route path="countries" element={<p>List of countries</p>} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
