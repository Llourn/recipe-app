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
      <div className="recipes flow">
        {error && <p>{error}</p>}
        {isPending && <p>Loading...</p>}
        {!isPending &&
          recipes &&
          (recipes.length > 0 ? (
            <div className="recipes__list flow">
              {recipes.map((recipe) => (
                <p key={recipe._id}>
                  <Link to={`recipes/${recipe._id}`}>{recipe.name}</Link>
                </p>
              ))}
            </div>
          ) : (
            <p>
              You have no recipes, please click the Add Recipe button to add
              your first recipe!
            </p>
          ))}
        <Link to="/RecipeForm">
          <button className="btn">Add Recipe</button>
        </Link>
      </div>
    </section>
  );
};

export default Recipes;
