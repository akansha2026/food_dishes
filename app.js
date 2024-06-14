const input = document.querySelector("input");
const btn = document.getElementById("dish");
const img = document.getElementById("image");
const src = document.getElementById("src");
const video = document.getElementById("vdo");
const para = document.querySelector("p");
const heading = document.querySelector("h1");
const area = document.querySelector("h2");
const table = document.querySelector("table")


function getData(){
    const value = input.value
    const responsePromise = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    responsePromise.then((response) =>{
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            if(data.meals == null) return;
            const ans = {};
            const meal = data.meals[0];
            ans.name = meal.strMeal;
            ans.fromWhere = meal.strArea;
            ans.source = meal.strSource;
            ans.video = meal.strYoutube;
            ans.image = meal.strMealThumb;
            ans.instructions = meal.strInstructions;
            ans.ingredients = [];
            ans.measurement = [];
            let idx = 1;
            while(meal[`strIngredient${idx}`]){
                ans.ingredients.push(meal[`strIngredient${idx}`]);
                ans.measurement.push(meal[`strMeasure${idx}`]);
                idx += 1;
            }

           
            // Now we will update our UI
            img.src = ans.image
            heading.innerText = ans.name
            area.innerHTML = `This belong to ${ans.fromWhere} area.`
            para.innerHTML = ans.instructions;
            src.href = ans.source;
            video.href = ans.video;

            // clear out the table
            table.innerHTML = "<tr><th>Ingedient</th><th>Measurement</th><tr>";
            for(let i=0; i<ans.ingredients.length; i++){
                const row = document.createElement('tr');
                const ing = document.createElement('td');
                ing.innerHTML = ans.ingredients[i];
                const meas = document.createElement('td');
                meas.innerHTML = ans.measurement[i];
                row.append(ing, meas);
                table.append(row);
            }
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

btn.addEventListener("click", getData)