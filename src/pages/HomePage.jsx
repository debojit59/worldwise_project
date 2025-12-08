import { Link } from "react-router-dom";
import AppNav from "../components/AppNav";
import NavPage from "../components/PageNav";

function HomePage() {
  return (
    <>
      <NavPage />
      <AppNav />
      <h1>World WIse</h1>
      <Link to="/app">Go to App</Link>
    </>
  );
}

export default HomePage;
