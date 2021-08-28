import { useState } from "react";

const Ingredient = ({ index, info }) => {
  const [name, setName] = useState("");
  // const [quantity, setQuantity] = useState(ingredient.quantity);
  // const [unitOfMeasurement, setUnitOfMeasurement] = useState(ingredient.unitOfMeasurement);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="ingredient">
      <input
        type="text"
        name={`ingredient-name-${index}`}
        id={`ingredient-name-${index}`}
        placeholder="Name"
        value={name}
        onChange={(e) => handleNameChange(e)}
      />
      <input
        type="text"
        name="ingredient-quantity"
        id="ingredient-quantity"
        placeholder="Quantity"
      />
      <select name="unit-of-measurement" id="unit-of-measurement">
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
