import { afficheRecettes } from "./test.js";


const categorySelect = document.getElementById('categorySelect');
const paysSelect = document.getElementById('paysSelect');





/* Requête API pour les catégories */

async function fetchCategories() {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await res.json();
        console.log('Liste des catégories :', data.meals);
        return data.meals;
    } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
        return [];
    }
}

/* Requête API pour les pays */

async function fetchPays() {
    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        const data = await res.json();
        console.log('Liste des pays :', data.meals);
        return data.meals || [];
    } catch (error) {
        console.error('Erreur lors du chargement des pays :', error);
        return [];
    }
}





/* Requête API pour la liste des recettes d'un pays */

async function fetchRecettesParPays(pays) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${pays}`);
        const data = await res.json();
        console.log('Recettes du pays sélectionné :', data.meals);
        return data.meals || [];
    } catch (error) {
        console.error('Erreur lors du chargement des recettes :', error);
        return [];
    }
}

/* Requête API pour la liste des recettes d'une categorie */

async function fetchRecettesParCategorie(categorie) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
        const data = await res.json();
        console.log('Recettes de la categorie :', data.meals);
        return data.meals || [];
    } catch (error) {
        console.error('Erreur lors du chargement des recettes :', error);
        return [];
    }
}




/* Remplissage des boutons selecteurs */

export async function buttonRemplir() {
    const categories = await fetchCategories();
    const areas = await fetchPays();

    // Creation de Option dans les boutons HTML

    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area.strArea;
        option.textContent = area.strArea;
        paysSelect.appendChild(option);
    });

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        categorySelect.appendChild(option);
    });
}



/* Au chargement de la page requete fetch listes boutons selecteurs */


document.addEventListener('DOMContentLoaded', () => {
    buttonRemplir();
});

/* Listener sur le sélecteur de pays */

paysSelect.addEventListener('change', async (event) => {
    event.preventDefault();
    const paysSelectionne = paysSelect.value;
    const meals = await fetchRecettesParPays(paysSelectionne);

    afficheRecettes(meals)
    
});

/* Listener sur le sélecteur de categorie */

categorySelect.addEventListener('change', async (event) => {
    event.preventDefault();
    const categorySelectionne = categorySelect.value;
    const meals = await fetchRecettesParCategorie(categorySelectionne);

    afficheRecettes(meals)
    
});