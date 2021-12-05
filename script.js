const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const randomMeal = document.getElementById("randomMeal");

let search = ""; //stock de string vide

const fetchSearch = async(url) => {
    meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/${url}`)//ce qui sera incrémenté dans let search sera stocké dans ${search}
        .then(res => res.json())
        .then(res => res.meals);
        // console.log(meals);
    
}
//search
//affichage de la recherche = qui doit attendre la recheche qui attend fetchSeach
const searchDisplay = async() => {
    await fetchSearch(search);
    //si l'intérieur de ma saisie input ne correspons pas à mon api "null" alors envoie un message à l'utilisateur
    if (meals == null){
        results.innerHTML = '<span class="noResult">Aucun resultat</span>';
    }
//il va falloir mapper notre résultat
//donc on écrit du innerHTML dans mon (id results)
results.innerHTML = (
    meals.map(meal => (
        `
        <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="info">
        <div>origine : ${meal.strArea}</div>
        <div>catégorie : ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' /></br>
        <a href="${meal.strYoutube}"target=_blank"><i class="fab
        fa-youtube"</div>
        `
        //le target blank envoie sur une nouvelle page
    )).join('')//join evite d'afficher des virgules dans mon map
);


};

//la ou on écrit notre input,on va ecouter et ensuite tout stocker dans le (e)

searchInput.addEventListener("input", (e) => {
    search =`search.php?s=${e.target.value}`
    searchDisplay();
})


//random meal

const randomMealDisplay = async() => {
    await fetchSearch('random.php');

    results.innerHTML = (
        meals.map(meal => (

        `
        <div class="randomContainer">
        <h2>${meal.strMeal}</h2>
        <div class="info">
        <div>origine : ${meal.strArea}</div>
        <div>catégorie : ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' /></br>
        <a href="${meal.strYoutube}"target=_blank"><i class="fab
        fa-youtube"</div>
        



        `

        ))
    );
};

randomMeal.addEventListener("click", randomMealDisplay);
randomMealDisplay();