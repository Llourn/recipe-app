import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <section>
      <div className="recipe-buttons">
        <Link to="/Addrecipe">
          <button>Add Recipe</button>
        </Link>
      </div>
      <div className="recipe-list"></div>
    </section>
  );
};

export default Recipes;
