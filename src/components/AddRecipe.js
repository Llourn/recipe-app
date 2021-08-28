import Ingredient from "./Ingredient";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([
    {
      id: 0,
      name: `testName0`,
      quantity: 0,
      unit: "unit",
    },
  ]);
  const [recipeName, setRecipeName] = useState("");
  const [serves, setServes] = useState("");
  const [getStarted, setGetStarted] = useState("");
  const [instructions, setInstructions] = useState("");

  let count = 1;

  const handleAddIngredient = (event) => {
    event.preventDefault();
    const newValue = {
      id: count,
      name: `testName0`,
      quantity: 0,
      unit: "unit",
    };
    setIngredients((prevState) => {
      return [...prevState, newValue];
    });
    count++;
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
          {ingredients &&
            Object.entries(ingredients).map(([key, value]) => (
              <Ingredient key={key} index={key} info={value} />
            ))}
        </div>
        <button onClick={(event) => handleAddIngredient(event)}>+</button>
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
