import axios from "axios";

export default {
  // Search Edamam for recipes
  searchRecipes: function(q) {
    const apiURL = "https://api.edamam.com/search?";
    const apiKey = "&app_key=f6179a854d5788d08869b56fcda3ecc2";
    const apiID = "&app_id=726e9cff"
    let query = "q=" + q;
    let health = "&health=alcohol-free";
    return axios.get(apiURL + query + apiKey);
  },
  // get a single recipe w/ id
  getRecipe: function(id) {
    return axios.get("/api/books/" + id);
  }
};




https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free