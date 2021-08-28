import { Link } from "react-router-dom";
import logoWhite from "../img/logo-white.png";

const Navbar = () => {
  return (
    <section className="navbar">
      <div className="navbar__title">
        <img src={logoWhite} alt="" />
        <h1>Recipe App</h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/Mealplan">Mealplan</Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
