import { buttonRemplir } from "./button.js";

const searchForm = document.getElementById('searchForm');
const ingredientInput = document.getElementById('ingredient');
const recipesResults = document.getElementById('recipesResults');
const button = document.getElementById('button');

buttonRemplir()

/* Requete API pour les recettes ingrédient */

async function fetchRecipes(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.meals)
    return data.meals;
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes :', error);
    return null;
  }
}

/* Requete API pour les instructions  par ID */

async function fetchRecipeDetails(idMeal) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la recette :', error);
    return null;
  }
}



/* Événement au clic sur le bouton de recherche */




button.addEventListener('click', async (event) => {
  event.preventDefault();

  const ingredient = ingredientInput.value.trim();

  recipesResults.innerHTML = '';

 // S'il n'y a pas d'ingredient puis de recette : un message d'erreur 

  if (!ingredient) {
    recipesResults.innerHTML = '<p>Veuillez entrer un ingrédient.</p>';
    return;
  }

  const meals = await fetchRecipes(ingredient);

  if (!meals) {
    recipesResults.innerHTML = '<p>Aucune recette trouvée.</p>';
    return;
  }

  // Rappel de la fonction d'affichichage pour afficher

  afficheRecettes(meals)

});





// Creation de la div d'affichage des recettes



export function afficheRecettes(meals){ 

  recipesResults.innerHTML = '';

  meals.forEach((meal) => {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');
  
    recipeElement.innerHTML = `
      <img src="${meal.strMealThumb}" alt="Photo de : du plat" class="recipe-img"> <h3>${meal.strMeal}</h3>`;
  
  
  
  
      // Creation du bouton avce l'id de la recette
      
  
  
    const viewRecipe = document.createElement('button');
    viewRecipe.textContent = 'Voir la recette';
    viewRecipe.classList.add('view');
  
    viewRecipe.addEventListener('click', async () => {
  
      // Coupe le fetch si les instructions sont deja affichées 
  
      const existingInstructions = recipeElement.querySelector('.instructions');

      if (existingInstructions) {
      existingInstructions.remove();
      return;
      }
  
      const details = await fetchRecipeDetails(meal.idMeal);
  
      console.log(details)
  
  
  
      // S'il y a un retour du fetch : on cree la div pour les instructions
  
  
  
      if (details) {
        const instructions = document.createElement('div');
        instructions.classList.add('instructions');
  
        instructions.innerHTML = `
          <h4>Instructions</h4>
          <p>${details.strInstructions}</p>`;
  
        recipeElement.appendChild(instructions);
      }
    });
  
  
  
  
    recipeElement.appendChild(viewRecipe);
    recipesResults.appendChild(recipeElement);
  });
  
} 
