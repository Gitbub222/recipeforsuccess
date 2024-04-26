export interface Ingredient {
  name: string;
  amount: string;
}

// export interface Recipe {
//     title: string;
//     duration: string;
//     calories: number;
//     serves: number;
//     ingredients: Ingredient[];
//     preparationSteps: string[];
//     image: string;
//   }


export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  Saved: undefined;
  Search: undefined;
  Main: undefined;
  RecipeDetail: {
    recipeID: number; // Assuming `Recipe` is a type or interface you've defined
  };
  SearchResults: {
    recipes: any; // Assuming `Recipe` is a type or interface you've defined
  };
  // ... other screen params
};

const shuffleArray = (array: any) => {
  const arrayCopy = [...array]; // Create a copy of the original array

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Swap elements
  }

  return arrayCopy;
}


const recipes = [{ "id": 659460, "image": "https://img.spoonacular.com/recipes/659460-312x231.jpg", "title": "Savory Chard & Prosciutto Tart" },
{ "id": 637645, "image": "https://img.spoonacular.com/recipes/637645-312x231.jpg", "title": "Cheesy Cauliflower Pancakes" },
{ "id": 665815, "image": "https://img.spoonacular.com/recipes/665815-312x231.jpg", "title": "Zucchini/ Yellow Squash Quiche" },
{ "id": 651202, "image": "https://img.spoonacular.com/recipes/651202-312x231.jpg", "title": "Mashed Cauliflower" },
{ "id": 661323, "image": "https://img.spoonacular.com/recipes/661323-312x231.jpg", "title": "Spinach pie with home made dough" },
{ "id": 636599, "image": "https://img.spoonacular.com/recipes/636599-312x231.jpg", "title": "Butternut Squash Gnocchi With Whiskey Cream Sauce" },
{ "id": 633820, "image": "https://img.spoonacular.com/recipes/633820-312x231.jpg", "title": "Baked Stuffed Peppers" },
{ "id": 651965, "image": "https://img.spoonacular.com/recipes/651965-312x231.jpg", "title": "Mini Meatball & Ravioli Soup With Garlic Croutons" },
{ "id": 645092, "image": "https://img.spoonacular.com/recipes/645092-312x231.jpg", "title": "Gougeres Appetizer" },
{ "id": 643786, "image": "https://img.spoonacular.com/recipes/643786-312x231.jpg", "title": "Fried Rice - Chinese comfort food" },
{ "id": 646425, "image": "https://img.spoonacular.com/recipes/646425-312x231.jpg", "title": "Healthier Pork Fried Rice" },
{ "id": 658290, "image": "https://img.spoonacular.com/recipes/658290-312x231.jpg", "title": "Rice with Fried Egg and Sausage" },
{ "id": 648474, "image": "https://img.spoonacular.com/recipes/648474-312x231.jpg", "title": "Japanese Fried Rice" },
{ "id": 637996, "image": "https://img.spoonacular.com/recipes/637996-312x231.jpg", "title": "Chicken Brown \"Fried\" Rice" },
{ "id": 663104, "image": "https://img.spoonacular.com/recipes/663104-312x231.jpg", "title": "Thai Fried Rice" },
{ "id": 642138, "image": "https://img.spoonacular.com/recipes/642138-312x231.jpg", "title": "Easy Vegetable Fried Rice" },
{ "id": 643674, "image": "https://img.spoonacular.com/recipes/643674-312x231.jpg", "title": "Fried Brown Rice" }, 
{ "id": 649031, "image": "https://img.spoonacular.com/recipes/649031-312x231.jpg", "title": "Korean Bibimbab (Rice w Vegetables & Beef)" }, 
{ "id": 649073, "image": "https://img.spoonacular.com/recipes/649073-312x231.jpg", "title": "Korean Saewoo Bokkeumbap (Shrimp Fried Rice)" }]

export const recipes1 = shuffleArray(recipes);