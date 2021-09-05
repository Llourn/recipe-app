import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../utilities/useFetch";

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
    <section className="display-recipe-container">
      {error && <p>{error}</p>}
      {isPending && <p>...Loading</p>}
      {!isPending && recipe && (
        <div className="display-recipe">
          <h1>{recipe.name}</h1>
          <p>{recipe.serves}</p>
          <p>{recipe.getStarted}</p>
          {recipe.ingredients.map((ingredient) => (
            <div className="display-ingredient">
              <span>{ingredient.name}</span>
              <span>{ingredient.quantity}</span>
              <span>{ingredient.unitOfMeasurement}</span>
            </div>
          ))}
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        </div>
      )}
    </section>
  );
};

export default DisplayRecipe;
