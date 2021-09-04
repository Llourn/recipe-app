import { useState } from "react";

const Ingredient = ({ ingredient, handleIdIngredientChange }) => {
  const [name, setName] = useState(ingredient.name);
  const [quantity, setQuantity] = useState(ingredient.quantity);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(
    ingredient.unitOfMeasurement
  );

  console.log(ingredient);

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleIdIngredientChange(e, ingredient.id, "name");
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    handleIdIngredientChange(e, ingredient.id, "quantity");
  };

  const handleUnitOfMeasurementChange = (e) => {
    setUnitOfMeasurement(e.target.value);
    handleIdIngredientChange(e, ingredient.id, "unit");
  };

  return (
    <div className="ingredient">
      <input
        type="text"
        name={`ingredient-name`}
        id={`ingredient-name`}
        placeholder="Name"
        value={name}
        onChange={(e) => handleNameChange(e)}
      />
      <input
        type="text"
        name="ingredient-quantity"
        id="ingredient-quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => handleQuantityChange(e)}
      />
      <select
        name="unit-of-measurement"
        id="unit-of-measurement"
        value={unitOfMeasurement}
        onChange={(e) => {
          handleUnitOfMeasurementChange(e);
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
    </div>
  );
};

export default Ingredient;
