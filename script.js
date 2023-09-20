// 4. Boite pour afficher les recettes :
const result = document.getElementById('result');

// 6. Pointer le formulaire :
const form = document.querySelector("form");

// 8. Pointer l'input pour récupérer ce qui est taper dedans :
const input = document.querySelector("input");

// 3. VARIABLE : On se crée une boite pour les données :
let meals = [];

// 2. FONCTION : Il est toujours préférable de mettre la logique d'un fetch dans une fonction (fonction asynchrone async-await) :
async function fetchMeals(search) {

    // 10. Utiliser le paramètre de la fonction (search) pour concaténer ce que tape le user avec l'adresse (ce qu'on doit aller chercher dans l'API) :

    // 1.FETCH : va me chercher cette API :   
    await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search)
        //".json" : je te convertis pour que tu sois lisible en JS :
        .then((res) => res.json())
        //Ce que j'obtiens, je le mets dans "data" puis je l'affiche :
        .then((data) => (meals = data.meals));
}

// 5. Fonction pour afficher les recettes :
function mealsDisplay() {

    // 12. Afficher un message d'erreur si ce qui est tapé est nul :
    if (meals === null) {
        result.innerHTML = "<h2>No result</h2>";
    } else {

    //Afficher un nombre limité de recettes :
    meals.length = 12;

    //".map" : pour lister les choses, prend toujours en paramètre le nom de chaque tour de boucle :
    // ATTENTION : si accolades après le .map, il faut obligatoirement mettre "return" juste aprés.
    result.innerHTML = meals.map((meal) => {
        
        // 13. Création d'une boucle pour afficher les ingrédients en fonction de leurs nombres :

        //Stocker les ingrédients dans une variable :
        let ingredients = [];

        //Il y forcément un ingrédient donc i = 1
        //Et pas plus que 20, donc si i < 21
        //Itérer jusqu'à ce qu'on arrive au bout des ingrédients : i++
        for (i = 1; i < 21; i++) {

            //Est-ce que i existe ? (structure de test particulière)
            if (meal[`strIngredient${i}`]) {
                //Créer des sous-variables pour mettre les ingrédients bout à bout :
                let ingredient = meal[`strIngredient${i}`];
                let measure = meal[`strMeasure${i}`];

                //Stocker les élèments obtenus dans la variable array déclarée plus haut :
                ingredients.push(`<li>${ingredient} - ${measure}</li>`);
            }
        }
    
        //Aller chercher les infos que l'on souhaite intégrées à partir de la console (".x" = path):
        return `
            <li class='card'>
                <h2>${meal.strMeal}</h2>
                <p>${meal.strArea}</p>
                <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}">
                <ul>${ingredients.join(" ")}</ul>
            </li>
        `
    }).join(" ");
    }
}

// 9. Ajouter un évènement sur la balise input pour récupérer ce que le user a tapé (e.target.value):
// 11. Jouer la fonction fetchMeals avec en paramètre ce qui est tapé dans l'input :
input.addEventListener('input', (e) => {
    fetchMeals(e.target.value);
})

// 7. Ajouter un évènement au formulaire quand il est envoyé (pour que les recettes s'affichent) :
// Tu joues la fonction fetchMeals() puis (une fois que c'est fini - async-await), tu joues mealsDisplay().
form.addEventListener("submit", (e) => {
    // e : en le récupérant et en lui ajoutant .prenventDefault(), on se prémunit contre le comportement du rechargement de la page
    e.preventDefault();
    mealsDisplay();
});
