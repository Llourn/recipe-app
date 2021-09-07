import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import DOMPurify from "dompurify";

const DisplayRecipe = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const {
    error,
    isPending,
    data: recipeData,
  } = useFetch(process.env.REACT_APP_API_BASE + "/recipes/" + id);

  useEffect(() => {
    setRecipe(recipeData);
  }, [recipeData]);

  return (
    <section className="display-recipe">
      {error && <p>{error}</p>}
      {isPending && <p>...Loading</p>}
      {!isPending && recipe && (
        <div className="flow">
          <h1>{recipe.name}</h1>
          <p>Servings: {recipe.serves}</p>
          <h2>Getting Started:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.getStarted),
            }}
          />
          <hr />
          <div className="display-recipe__ingredients">
            <h2>Ingredients:</h2>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="display-recipe__ingredient">
                <span>{ingredient.name}</span>
                <span>
                  {ingredient.quantity} {ingredient.unitOfMeasurement}
                </span>
              </div>
            ))}
          </div>
          <hr />
          <h2>Intructions:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(recipe.instructions),
            }}
          />
        </div>
      )}
    </section>
  );
};

export default DisplayRecipe;
