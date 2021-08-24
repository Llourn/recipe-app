const AddRecipe = () => {
  return (
    <section className="add-recipe">
      <h1>Fill out the form to add a recipe!</h1>
      <form action="" method="post">
        <label>
          Recipe Name:
          <input type="text" name="recipe-name" id="recipe-name" />
        </label>
        <br />
        <label>
          Serves:
          <input type="number" name="serves" id="serves" />
        </label>
        <br />
        <label>
          Get started:
          <br />
          <textarea name="get-started" id="get-started" cols="30" rows="10">
            Preheat the oven to 900°F, wash dem veggies!
          </textarea>
        </label>
        <br />
        <label>Ingredients</label>
        <div className="ingredient">
          <input
            type="text"
            name="ingredient-name"
            id="ingredient-name"
            placeholder="Name of ingredient"
          />
          <input
            type="number"
            name="ingredient-amount"
            id="ingredient-amount"
          />
          <select name="ingredient-unit" id="ingredient-unit">
            <option value="ml">ml</option>
            <option value="oz">oz</option>
            <option value="cups">cups</option>
          </select>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </section>
  );
};

export default AddRecipe;
