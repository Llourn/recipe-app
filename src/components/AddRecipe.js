import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [serves, setServes] = useState("");
  const [getStarted, setGetStarted] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleAddIngredient = (event) => {
    event.preventDefault();
    const newValue = {
      name: `Test Name`,
      quantity: 0,
      unit: "unit",
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

  const handleGetStartedChange = (e) => {
    setGetStarted(e.target.value);
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
        getStarted: getStarted,
        ingredients: ingredients,
        instructions: instructions,
      }),
    }).then((res) => res.json());
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
      list[index].unit = e.target.value;
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
    <section className="add-recipe">
      <h1>Fill out the form to add a recipe!</h1>
      <form>
        <label>
          Recipe Name:
          <input
            type="text"
            value={recipeName}
            onChange={(e) => handleRecipeNameChange(e)}
          />
        </label>
        <br />
        <label>
          Serves:
          <input
            type="number"
            value={serves}
            onChange={(e) => handleServesChange(e)}
          />
        </label>
        <br />
        <label>
          Get started:
          <br />
          <textarea
            name="get-started"
            id="get-started"
            cols="30"
            rows="10"
            value={getStarted}
            onChange={(e) => {
              handleGetStartedChange(e);
            }}
          ></textarea>
        </label>
        <br />
        <label>Ingredients</label>
        <div className="ingredients">
          <button onClick={(event) => handleAddIngredient(event)}>+</button>
          {ingredients.length > 0 ? (
            ingredients.map((element, index) => (
              <div key={`key-${index}`} className={`ingredient id-${index}`}>
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
                  onClick={(e) => {
                    handleIngredientDelete(e, index);
                  }}
                >
                  X
                </button>
              </div>
            ))
          ) : (
            // ingredients.forEach((ingredient) => {
            //   <Ingredient key={ingredient.id} ingredient={ingredient} />;
            // })
            <p>Let's start adding ingredients to this recipe!</p>
          )}
        </div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Write out instructions here! 📄</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setInstructions(data);
            console.log({ event, editor, data });
            console.log(instructions);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <br />
        <button onClick={(e) => handleCreate(e)}>SAVE</button>
      </form>
    </section>
  );
};

export default AddRecipe;
