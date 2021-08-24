import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="navbar">
      <h1>Recipe App</h1>
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
