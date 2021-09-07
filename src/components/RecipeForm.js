import { useState } from "react";
import Editor from "../ckeditor5/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [serves, setServes] = useState("");
  const [getStarted, setGetStarted] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddIngredient = (event) => {
    event.preventDefault();
    const newValue = {
      name: "",
      quantity: "",
      unitOfMeasurement: "",
    };
    setIngredients((prevState) => {
      return [...prevState, newValue];
    });
  };

  const handleRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleServesChange = (e) => {
    const serveNumber = Number(e.target.value);
    setServes(serveNumber);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(instructions);
    const data = await fetch(process.env.REACT_APP_API_BASE + "/recipe/new", {
      crossDomain: true,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${Userfront.accessToken()}`,
      },

      body: JSON.stringify({
        name: recipeName,
        serves: serves,
        getStarted: getStarted || "GS PLACEHOLDER",
        ingredients: ingredients,
        instructions: instructions,
      }),
    })
      .then((res) => res.json())
      .then();
    console.log(data);
  };

  const handleIngredientNameChange = (e, index) => {
    setIngredients((prevState) => {
      let list = [...prevState];
      list[index].name = e.target.value;
      return list;
    });
  };

  const handleIngredientQuantityChange = (e, index) => {
    setIngredients((prevState) => {
      let list = [...prevState];
      list[index].quantity = e.target.value;
      return list;
    });
  };

  const handleIngredientUnitChange = (e, index) => {
    setIngredients((prevState) => {
      let list = [...prevState];
      list[index].unitOfMeasurement = e.target.value;
      return list;
    });
  };

  const handleIngredientDelete = (e, index) => {
    e.preventDefault();
    setIngredients((prevState) => {
      let list = [...prevState];
      list.splice(index, 1);
      return list;
    });
  };

  return (
    <form className="recipe-form flow">
      <h1>Fill out the form to add a recipe!</h1>
      <label>
        Recipe Name:
        <input
          type="text"
          value={recipeName}
          onChange={(e) => handleRecipeNameChange(e)}
        />
      </label>
      <label>
        Serves:
        <input
          type="number"
          value={serves}
          onChange={(e) => handleServesChange(e)}
        />
      </label>
      <CKEditor
        editor={Editor}
        config={{
          toolbar: [
            "Heading",
            "bold",
            "Italic",
            "Link",
            "BulletedList",
            "NumberedList",
            "Undo",
            "Redo",
          ],
        }}
        data="<p>Getting started stuff goes here.</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          setGetStarted(data);
        }}
      />
      <hr />
      <div className="recipe-form__ingredients flow">
        <button className="btn" onClick={(event) => handleAddIngredient(event)}>
          Add Ingredient
        </button>
        {ingredients.length > 0 ? (
          ingredients.map((element, index) => (
            <div key={`key-${index}`} className={`recipe-form__ingredient`}>
              <input
                type="text"
                name={`ingredient-name`}
                id={`ingredient-name`}
                placeholder="Name"
                value={element.name}
                onChange={(e) => handleIngredientNameChange(e, index)}
              />
              <input
                type="text"
                name="ingredient-quantity"
                id="ingredient-quantity"
                placeholder="Quantity"
                value={element.quantity}
                onChange={(e) => handleIngredientQuantityChange(e, index)}
              />
              <select
                name="unit-of-measurement"
                id="unit-of-measurement"
                value={element.unit}
                onChange={(e) => {
                  handleIngredientUnitChange(e, index);
                }}
              >
                <option value="unit">unit</option>
                <option value="cup">cup</option>
                <option value="tsp">tsp</option>
                <option value="tbsp">tbsp</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
              <button
                className="btn btn--round btn--delete"
                onClick={(e) => {
                  handleIngredientDelete(e, index);
                }}
              >
                <span>✕</span>
              </button>
            </div>
          ))
        ) : (
          <p>Let's start adding ingredients to this recipe!</p>
        )}
      </div>
      <hr />
      <CKEditor
        editor={Editor}
        config={{
          toolbar: [
            "Heading",
            "bold",
            "Italic",
            "Link",
            "BulletedList",
            "NumberedList",
            "Undo",
            "Redo",
          ],
        }}
        data="<p>Write out instructions here! 📄</p>"
        onChange={(event, editor) => {
          const data = editor.getData();
          setInstructions(data);
        }}
      />
      <button className="btn" onClick={(e) => handleCreate(e)}>
        SAVE
      </button>
    </form>
  );
};

export default RecipeForm;
