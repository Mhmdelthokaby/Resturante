
let contentView = document.getElementById('contentView')
let content = ``;

let slideBar = document.getElementById('checkNav')
let checkNav = false

let arrContent = []

// loading Screen

function loading() {
    $(window).on('load', function () {
        $('#spinner').fadeOut(2000, function () {
            $('body').css('overflow', 'visible')
        })
    })
}
loading()
// ///////////

// open / close
$('#checkNav').click(() => {
    if (checkNav) {
        checkNav = false
        slideBar.innerHTML = `<i class="fa-solid fa-bars"></i>`
        $('.slideBar').animate({ left: "-250px" })
        $('.slideBar ul li').animate({ marginTop: "50px" })
    }
    else {
        checkNav = true
        slideBar.innerHTML = `<i class="fa-solid fa-x"></i>`
        $('.slideBar').animate({ left: "0px" })
        $('.slideBar ul li').animate({ marginTop: "10px" })
    }
})
function close() {
    checkNav = false
    slideBar.innerHTML = `<i class="fa-solid fa-bars"></i>`
    $('.slideBar').animate({ left: "-250px" })
    $('.slideBar ul li').animate({ marginTop: "50px" })
}
//display main window
async function displayMain() {

    for (let i = 0; i < 20; i++) {
        let x = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        let y = await x.json();
        let item = `<div class="mealBox  overflow-hidden item">
    <div class="position-relative">
        <img class="w-100 rounded-3"
            src="${y.meals[0].strMealThumb}" alt="">
        <div class="layerUp rounded-3 d-flex align-items-center">
            <h3 class="p-3" id="title">${y.meals[0].strMeal}</h3>
        </div>
    </div>
</div>`
        content += item
        let idValue = y.meals[0].idMeal
        arrContent.push(idValue)
    }
    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < 20; i++) {
        item[i].addEventListener('click', function (e) {
            Instructions(arrContent[i]);
        })
    }

}

displayMain()

// display meal
let strIngredient = ``
async function Instructions(id) {
    loading()
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let y = await x.json();

    // test(id)
    let item = `<div class="col-4">
    <img class="w-100 rounded-3" src="${y.meals[0].strMealThumb}" alt="">
    <h3 class="py-3 text-white">${y.meals[0].strMeal}</h3>
</div>
<div class="col-8 text-white vstack gap-2">
    <h3 class="fw-bold">Instructions</h3>
    <p>${y.meals[0].strInstructions}</p>

    <h2>Area : <span id="areaIns">${y.meals[0].strArea}</span></h2>
    <h2>Category : <span id="categoryIns">${y.meals[0].strCategory}</span></h2>
    <h2>Recipes  : </h2>
    <div id="strIngredient">
        
    </div>
    <h2>Tags : <span>${y.meals[0].strTags}</span></h2>
    <div>
        <a href="${y.meals[0].strYoutube}" class="btn btn-success">Source</a>
        <a href="${y.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
</div>`
    contentView.innerHTML = item
    let strIngredientV = document.getElementById('strIngredient')
    let strIngredient = ``
    let counter = 0
    for (let i in y.meals[0]) {
        if (counter >= 9 && counter < 29) {
            if (y.meals[0][i] == "") {
                break
            }
            else {
                let item = `<span id="boxStr" class="m-2 p-1 rounded-2">${y.meals[0][i]}</span>`
                strIngredient += item

            }
        }
        counter++
    }
    strIngredientV.innerHTML = strIngredient

}

//search
let searchContent = document.getElementById('searchContent')
$('#seacrcButton').click(() => {
    close()
    contentView.innerHTML = ``
    searchContent.innerHTML = `<div class="row row-cols-sm-1 row-cols-lg-2">
    <div>
        <input id="SearchName" onkeyup="searchN()" type="text" class="w-100 bg-transparent rounded-3 form-control text-white" placeholder="Search By first Name">
    </div>
    <div>
        <input id="SearchFName" onkeyup="searchF()" type="text" maxlength="1" class="w-100 bg-transparent rounded-3 form-control text-white" placeholder="Search By Name">
    </div>
</div>`


})

async function searchF() {

    let SearchFName = document.getElementById('SearchFName').value



    let contents = ``
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${SearchFName}`);
    let y = await x.json();


    for (let i = 0; i < y.meals.length; i++) {
        let item = `<div class="mealBox  overflow-hidden item">
    <div class="position-relative">
        <img class="w-100 rounded-3"
            src="${y.meals[i].strMealThumb}" alt="">
        <div class="layerUp rounded-3 d-flex align-items-center">
            <h3 class="p-3" id="title">${y.meals[i].strMeal}</h3>
        </div>
    </div>
</div>`
        contents += item

    }
    loading()
    contentView.innerHTML = contents
    console.log(y.meals.length);

    let item = document.getElementsByClassName('item')
    for (let i = 0; i < 20; i++) {
        item[i].addEventListener('click', function (e) {
            Instructions(arrContent[i]);
        })
    }
}

async function searchN() {
    let SearchName = document.getElementById('SearchName').value



    let contents = ``
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchName}`);
    let y = await x.json();


    for (let i = 0; i < y.meals.length; i++) {
        let item = `<div class="mealBox  overflow-hidden item">
    <div class="position-relative">
        <img class="w-100 rounded-3"
            src="${y.meals[i].strMealThumb}" alt="">
        <div class="layerUp rounded-3 d-flex align-items-center">
            <h3 class="p-3" id="title">${y.meals[i].strMeal}</h3>
        </div>
    </div>
</div>`
        contents += item

    }
    loading()
    contentView.innerHTML = contents
    console.log(y.meals.length);

    let item = document.getElementsByClassName('item')
    for (let i = 0; i < y.meals.length; i++) {
        item[i].addEventListener('click', function (e) {
            Instructions(arrContent[i]);
        })
    }
}


// Category
let categoryButton = document.getElementById('categoryButton')
$('#categoryButton').click(() => {
    close()
    category()

})

async function category() {

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let y = await x.json();
    contentView.innerHTML = ``
    let content = ``
    arrContent = []
    for (let i = 0; i < y.categories.length; i++) {
        let item = `<div class="mealBox  overflow-hidden item">
        <div class="position-relative">
            <img class="w-100 rounded-3"
                src="${y.categories[i].strCategoryThumb}" alt="">
            <div class="layerUp rounded-3 d-flex flex-column text-center">
                <h3 class="" id="title">${y.categories[i].strCategory}</h3>
                <p>${y.categories[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
        content += item
        arrContent.push(y.categories[i].strCategory)
    }
    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < y.categories.length; i++) {
        item[i].addEventListener('click', function (e) {
            showCategoryMeals(arrContent[i]);
        })
    }

}

async function showCategoryMeals(id) {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
    let y = await x.json();

    let content = ``

    for (let i = 0; i < y.meals.length; i++) {
        let item = `<div class="mealBox  overflow-hidden item">
    <div class="position-relative">
        <img class="w-100 rounded-3"
            src="${y.meals[i].strMealThumb}" alt="">
        <div class="layerUp rounded-3 d-flex align-items-center">
            <h3 class="p-3" id="title">${y.meals[i].strMeal}</h3>
        </div>
    </div>
</div>`
        content += item
        arrContent = []
        let idValue = y.meals[0].idMeal
        arrContent.push(idValue)
    }
    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < y.meals.length; i++) {
        item[i].addEventListener('click', function (e) {
            Instructions(arrContent[i]);

        })
    }

}


//area
let areaButton = document.getElementById('areaButton')
$('#areaButton').click(() => {
    close()
    area()
})

async function area() {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let y = await x.json();
    contentView.innerHTML = ``
    let content = ``
    arrContent = []
    for (let i = 0; i < y.meals.length; i++) {
        let item = `<div class="fw-bold text-white text-center item">
        <div class="fs-1"><i class="fa-solid fa-house-laptop"></i></div>
        <h3>${y.meals[i].strArea}</h3>
    </div> `
        content += item
        arrContent.push(y.meals[i].strArea)
    }

    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < y.meals.length; i++) {
        item[i].addEventListener('click', function (e) {
            showAreaMeals(arrContent[i]);
        })
    }

}

async function showAreaMeals(id) {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    let y = await x.json();
    contentView.innerHTML = ``
    let content = ``

    for (let i = 0; i < y.meals.length; i++) {
        let item = `<div class="mealBox  overflow-hidden item">
    <div class="position-relative">
        <img class="w-100 rounded-3"
            src="${y.meals[i].strMealThumb}" alt="">
        <div class="layerUp rounded-3 d-flex align-items-center">
            <h3 class="p-3" id="title">${y.meals[i].strMeal}</h3>
        </div>
    </div>
</div>`
        content += item
        arrContent = []
        let idValue = y.meals[0].idMeal
        arrContent.push(idValue)
    }
    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < y.meals.length; i++) {
        item[i].addEventListener('click', function (e) {
            Instructions(arrContent[i]);

        })
    }

}

//Ingredients
$('#ingredientsButton').click(() => {
    close()
    ingredients()
})

async function ingredients() {
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let y = await x.json();
    contentView.innerHTML = ``
    let content = ``
    arrContent = []
    for (let i = 0; i < 20; i++) {

        let item = `<div class="fw-bold text-white text-center item">
        <div class="fs-1"><i class="fa-solid fa-drumstick-bite"></i></div>
        <h3>${y.meals[i].strIngredient}</h3>
        <p>${y.meals[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
    </div> `
        content += item
        arrContent.push(y.meals[i].strIngredient)
    }

    loading()
    contentView.innerHTML = content


    let item = document.getElementsByClassName('item')
    for (let i = 0; i < 20; i++) {
        item[i].addEventListener('click', function (e) {
            showIngredientsMeals(arrContent[i]);
            console.log(arrContent[i]);
        })
    }
}

async function showIngredientsMeals(id) {


}


//contact Us

$('#contactUsButton').click(() => {
    close()
    Constant()
})




function Constant() {

    let content = `<div class="row row-cols-sm-1 row-cols-md-2 w-75 m-auto gy-4" >
    <div>
        <input type="text" onkeyup="checkNameValidation()" class="form-control bg-white " placeholder="Enter Your Name" id="inName">
        <div id="ErrorName" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Special characters and numbers not allowed</span></div>    
    </div>
    <div>
        <input type="email" onkeyup="checkEmailValidation()" class="form-control bg-white " placeholder="Enter Your Email" id="inEmail">
        <div id="ErrorEmail" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Email not valid *exemple@yyy.zzz</span></div>
    </div>
    <div>
        <input type="text" onkeyup="checkPhoneValidation()" class="form-control bg-white " placeholder="Enter Your Phone" id="inPhone">
        <div id="ErrorPhone" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Enter valid Phone Number</span></div>
    </div>
    <div>
        <input type="number" onkeyup="checkAgeValidation()" class="form-control bg-white " placeholder="Enter Your Age" id="inAge">
        <div id="ErrorNumber" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Enter valid age
        </span></div>
    </div>
    <div>
        <input type="password" onkeyup="checkPassValidation()" class="form-control bg-white " placeholder="Enter Your Password" id="inPassword">
        <div id="ErrorPassword" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Enter valid password *Minimum eight characters, at least one letter and one number:*</span></div>
    </div>
    <div>
        <input  type="password" onkeyup="checkRePassValidation()" class="form-control bg-white " placeholder="RePassword" id="rePassword">
        <div id="ErrorRepassword" class="redDiv d-none text-center p-2 my-2 rounded-2 "><span>Enter valid repassword</span></div>
    </div>
    
</div>
<div  class="p-5 d-flex justify-content-center w-100"><button disabled="true" class=" m-auto btn btn-outline-danger" id="submit">Submit</button></div>
`
    contentView.innerHTML = content

    
}


let checkName = false
let checkEmail = false
let checkPhone = false
let checkAge = false
let checkPassword = false
let checkRePassword = false


function checkButton()
{
    if(checkName&&checkEmail&&checkPhone&&checkPhone&&checkAge&&checkPassword&&checkRePassword){
        document.getElementById('submit').removeAttribute("disabled")
    }
}


function checkNameValidation(){
    var regex =/^[a-zA-Z ]{3,30}$/
        if(regex.test(document.getElementById("inName").value)){
            checkName = true
            console.log(checkName);
        }
    console.log(checkName);
    if(checkName){
        document.getElementById("ErrorName").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorName").classList.replace("d-none", "d-block")

    }
    checkButton()
}

function checkEmailValidation(){
    var regex =/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if(regex.test(document.getElementById("inEmail").value)){
            checkEmail = true
            
        }
    
    if(checkEmail){
        document.getElementById("ErrorEmail").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorEmail").classList.replace("d-none", "d-block")

    }
    checkButton()
}

function checkPhoneValidation(){
    // egyptian number
    var regex =/^01[0125][0-9]{8}$/
        if(regex.test(document.getElementById("inPhone").value)){
            checkPhone = true
            
        }
    
    if(checkPhone){
        document.getElementById("ErrorPhone").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorPhone").classList.replace("d-none", "d-block")

    }
    checkButton()
}

function checkAgeValidation(){
    var regex =/^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$/
        if(regex.test(document.getElementById("inAge").value)){
            checkAge = true
            
        }
    
    if(checkAge){
        document.getElementById("ErrorNumber").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorNumber").classList.replace("d-none", "d-block")

    }
    checkButton()
}

function checkPassValidation(){
    var regex =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
        if(regex.test(document.getElementById("inPassword").value)){
            checkPassword = true
            
        }
    
    if(checkPassword){
        document.getElementById("ErrorPassword").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorPassword").classList.replace("d-none", "d-block")

    }
    checkButton()
}

function checkRePassValidation()
{
    if(document.getElementById("inPassword").value==document.getElementById("rePassword").value)
    {
        checkRePassword = true
    }
    if(checkRePassword){
        document.getElementById("ErrorRepassword").classList.replace("d-block", "d-none")
    }
    else
    {
        document.getElementById("ErrorRepassword").classList.replace("d-none", "d-block")

    }
    checkButton()
}


