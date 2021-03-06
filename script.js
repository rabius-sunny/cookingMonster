// Search Key Handling
const getFoodName = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => { showResult(data) })
        .catch(() => {
            let showAlert = document.getElementById('alertMsg')
            showAlert.innerText = 'Sorry, No Food Found, Please Search with another Keyword'
            let alert = document.getElementById('alert')
            alert.style.display = 'block'
        })
}

// Submit Button Handling
const onSubmittask = () => {
    let getFood = document.getElementById('searchKey').value
    if (getFood.length > 0) {
        getFoodName(getFood)
    } else {
        let alertMessege = document.getElementById('alertMsg')
        alertMessege.innerText = 'Please Provide Your Keyword to Search'
        let alert = document.getElementById('alert')
        alert.style.display = 'block'
    }
}

// Input Field Handling On Focus
const onChangetask = () => {
    let alertMessege = document.getElementById('alert')
    alertMessege.style.display = 'none'
    let showDetail = document.getElementById('details')
    showDetail.style.display = 'none'
    let resetSearch = document.getElementById('foodContainer')
    resetSearch.innerHTML = ''
}

// Showing Result of Searching
const showResult = data => {
    let result = data.meals
    const ui = document.getElementById('foodContainer')
    result.map(foodData => {
        const foodName = foodData.strMeal
        const foodDiv = document.createElement('div')
        foodDiv.className = 'foods'
        const foodInfo = `
        <div class="food" onclick="showDetail('${foodName}')">
        <img src="${foodData.strMealThumb}">
        <h4>${foodData.strMeal}</h4>
        </div>
        `;
        foodDiv.innerHTML = foodInfo
        ui.appendChild(foodDiv)
    })
    document.getElementById('searchKey').value = ''
}

// Showing Details of Individual Food
const showDetail = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(res => res.json())
        .then(data => { showDetail(data.meals[0]) })
    const detailImg = document.getElementById('detailImg')
    const detailName = document.getElementById('detailName')
    const showDetail = food => {
        detailImg.setAttribute('src', `${food.strMealThumb}`)
        detailName.innerText = food.strMeal
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (food[`strIngredient${i}`]) {
                ingredients.push(`${food[`strIngredient${i}`]}`)
            } else {
                break
            }
        }
        const result = document.getElementById('list')
        result.innerHTML = ingredients.map(ingredient => `<li><i class="fas fa-check-circle icon"></i> ${ingredient}</li>`).join('')
        let detailArea = document.getElementById('details')
        detailArea.style.display = 'block'
    }
}

// Initial Interface
getFoodName('butter')
