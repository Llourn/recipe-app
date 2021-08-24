import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import Mealplan from "./components/Mealplan";
import AddRecipe from "./components/AddRecipe";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main flow">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Recipes">
              <Recipes />
            </Route>
            <Route exact path="/Addrecipe">
              <AddRecipe />
            </Route>
            <Route exact path="/Mealplan">
              <Mealplan />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
