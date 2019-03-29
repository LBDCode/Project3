import axios from "axios";

export default {
  // Search Edamam for recipes
  searchRecipes: function(q) {
    const apiURL = "https://api.edamam.com/search?";
    const apiKey = "&app_key=f6179a854d5788d08869b56fcda3ecc2";
    const apiID = "&app_id=726e9cff";
    let to = "&to=50";
    let query = "q=" + q;
    let health = "&health=alcohol-free";
    return axios.get(apiURL + query + apiID + apiKey + to + health);
  },
  // get a single recipe w/ uri
  getSingleRecipe: function(id) {
    const apiURL = "https://api.edamam.com/search?";
    const apiKey = "&app_key=f6179a854d5788d08869b56fcda3ecc2";
    const apiID = "&app_id=726e9cff";
    let r =
      "&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_" + id;
    return axios.get(apiURL + r + apiID + apiKey);
  },
  getDBRecipes: function(user) {
    return axios.get("api/" + user);
  },
  updateFavs: function(user, newFav) {
    return axios.put("api/" + user, {fav: newFav});
  },
  saveUser: function(user) {
    return axios.post("api/user", { email: user });
  },
  postRecipediaValues: function(searchCriteria) {
    return axios.post("api/searching", searchCriteria);
  }
};
