import useFetch from "../utilities/useFetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Recipes = () => {
  const [recipes, setRecipes] = useState(null);
  const {
    error,
    isPending,
    data: recipeData,
  } = useFetch(process.env.REACT_APP_API_BASE + "/recipes");

  useEffect(() => {
    setRecipes(recipeData);
  }, [recipeData]);

  return (
    <section>
      <div className="recipe-buttons">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {!isPending &&
          recipes &&
          (recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Link to={`recipes/${recipe._id}`} key={recipe._id}>
                {recipe.name}
              </Link>
            ))
          ) : (
            <p>
              You have no recipes, please click the Add Recipe button to add
              your first recipe!
            </p>
          ))}
        <Link to="/Addrecipe">
          <button>Add Recipe</button>
        </Link>
      </div>
      <div className="recipe-list"></div>
    </section>
  );
};

export default Recipes;
