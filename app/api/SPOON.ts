
import axios from 'axios';

const Spooncular_URL = 'https://api.spoonacular.com/recipes/findByIngredients?'
const API_key = 'e93c050423df40ee83352eec939a825f'
// const API_key = '770a132119eb4bdfa26d274da5eaa00d'
// const API_key = '0fe3b7402517498f86c8f7b3fa2c784c'

export interface Ingredient {
    name: string;
    amount: string;
}

type Calories = {
    amount: number;
    unit: string;
}

export interface Recipe {
    id: number,
    title: string,
    durationMin: number,
    calories: Calories,
    image: string,
    servings: number,
    preparationSteps: [],
    ingredients: [{ name: string; amount: any; unitShort: any; }],
    bookmarked?: boolean | null | undefined,
};


interface REQUEST_OPTIONS {
    method: string,
    url: string,
    headers: {}
};

const formatRecipe = (recipeData: any, calories: { amount: number, unit: string } | null, steps: []) => {
    return {
        id: recipeData.id,
        title: recipeData.title,
        durationMin: recipeData.readyInMinutes,
        calories: calories,
        image: recipeData.image,
        servings: recipeData.servings,
        preparationSteps: steps,
        ingredients: recipeData.extendedIngredients.map((ingredient: { name: any; measures: { us: { amount: any; unitShort: any; }; }; }) => ({
            name: ingredient.name,
            amount: ingredient.measures.us.amount,
            unitShort: ingredient.measures.us.unitShort
        }))
    };
}


const extractSteps = (data: any) => {
    const steps: any[] = [];

    data.forEach((recipe: any) => {
        recipe.steps.forEach((step: any) => {
            steps.push(step.step);
        });
    });

    return steps as [];
}

const extractCalories = (nutritionData: any) => {
    // Find the "Calories" nutrient object
    const caloriesEntry = nutritionData.nutrients.find((nutrient: any) => nutrient.name === "Calories");

    // Check if the calories were found
    if (caloriesEntry) {
        return {
            amount: caloriesEntry.amount,
            unit: caloriesEntry.unit
        } as { amount: number, unit: string };
    } else {
        // Handle the case where calories are not found
        return null; // Or return a default value if desired
    }
}

const url = {
    'steps': 'https://api.spoonacular.com/recipes/{id}/analyzedInstructions?apiKey={}',
    'calories': 'https://api.spoonacular.com/recipes/{id}/nutritionWidget.json?apiKey={}'
}


const parseRecipes = (data: any) => {
    return data.map((recipe: { id: number, title: string, image: string }) => {
        return {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
        };
    });
}


const parseIngredients = (ingredients: string[]) =>
    ingredients
        .map((ingredient, index) => {
            let newIngredient = ingredient;
            if (index !== 0) {
                newIngredient = "+" + ingredient;
            }
            return newIngredient;
        })
        .toString();


const getRecipesByIngredients = async (ingredients: string, num_recipes: number = 10) => {
    let recipes: [{ id: number, title: string, image: string }] | null = null;
    await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${num_recipes}&apiKey=${API_key}`)
        .then((response: any) => {
            recipes = parseRecipes(response.data)
        })
        .catch((error: any) => {
            console.error(error);
            return null
        });
    return recipes
}

const getRecipe = async (id: number) => {
    let recipe: Recipe | null = null;
    await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_key}`)
        .then(async (response: any) => {
            const steps = extractSteps(response.data)
            await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_key}`).then(
                async (response: any) => {
                    const calories = extractCalories(response.data)
                    await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_key}`).then((response: any) => {
                        const data = response.data;
                        recipe = {
                            id: data.id,
                            title: data.title,
                            durationMin: data.readyInMinutes,
                            calories: calories,
                            image: data.image,
                            servings: data.servings,
                            preparationSteps: steps,
                            ingredients: data.extendedIngredients.map((ingredient: { name: any; measures: { us: { amount: any; unitShort: any; }; }; }) => ({
                                name: ingredient.name,
                                amount: ingredient.measures.us.amount,
                                unitShort: ingredient.measures.us.unitShort
                            }))
                        } as Recipe
                    })
                }
            )


        })
        .catch((error: any) => {
            console.error(error);
            return null
        });
    return recipe
}



export { getRecipesByIngredients, parseIngredients, getRecipe }