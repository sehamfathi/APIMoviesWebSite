// $(".nav-item").eq(0).animate({ opacity: "1" }, 1000);
let asideWidth = $("aside").width();
let count = $(".nav-item").length;
let duration = 1000;
let category;
let movies;
const apiKey = "978e78abb24a4a96e6d401aad2542b97";
let navItems = $(".nav-item"); // to improve the performance
let defaultUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&fbclid=IwAR0KTsi8TUQOX3cgk4WQN_gKaFIIXqIG_eUgGsY51H3ZvBYqZ8hPCPgLRd4`;
const allMovies = document.getElementById("allMovies");
const word = document.getElementById("word");

// when the document ready
$(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $(".loading").remove();
    $("body").css("overflow", "auto");
  });
});

$(".closeBox i").click(function () {
  animateNavItem();
  $(".closeBox i").toggleClass("fa-xmark");
  let navWidth = $(".nav").innerWidth();
  if ($("aside").css("left") == "0px") {
    $("aside").animate({ left: -navWidth }, 1000);
    navItems.animate({ opacity: "0", paddingTop: "500px" });
  } else {
    $("aside").animate({ left: 0 }, 1000);
  }
});

function animateNavItem() {
  for (let i = 0; i < count; i++) {
    navItems.eq(i).animate({ opacity: "1", paddingTop: "5px" }, duration);
    duration += 100;
  }
}

// when cick on item nav to get the gategory
$(".nav-item a")
  .not("#contactus")
  .click(function (e) {
    category = $(e.target).attr("data-nav");
    if (category != "trending") {
      let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&fbclid=IwAR0KTsi8TUQOX3cgk4WQN_gKaFIIXqIG_eUgGsY51H3ZvBYqZ8hPCPgLRd4`;
      getMovies(url);
    } else {
      getMovies();
    }
  });

// button up (show - hide)
$(window).scroll(function () {
  if ($(window).scrollTop() > 700) {
    $("#buttonUp").fadeIn(500);
  } else {
    $("#buttonUp").fadeOut(500);
  }
});

//scroll smooth
$("#buttonUp").click(function () {
  $("html,body").animate({ scrollTop: 0 }, 500);
});

///******************************** *******************************************/
async function getMovies(url = defaultUrl) {
  const apiData = await fetch(url);
  const finalData = await apiData.json();
  movies = finalData.results;
  displayMovies(movies);
}
getMovies();

function displayMovies(movies) {
  let moviesLength = movies.length;
  let imgPath = "https://image.tmdb.org/t/p/w500";
  let cartona = "";
  for (let i = 0; i < moviesLength; i++) {
    cartona += `<div  class=" movie col-md-6 col-lg-4 my-3 shadow rounded"> 
                 <div class=" shadow rounded position-relative">
                     <img  class="img-fluid rounded"  src='${
                       imgPath + movies[i].poster_path
                     }'>
                  <div class="layer rounded  d-flex align-items-center flex-column  justify-content-center  text-center ">
                      <h5> ${movies[i].title}</h5>
                      <p>  ${movies[i].overview} <p>
                      <p> ${movies[i].vote_average}</p>
                      <p> ${movies[i].release_date}</p>
                  </div>
    </div>
      </div>`;
  }
  $(".movieRow").html(cartona);
}

/************************ search ********************************* */
// search with API search
allMovies.addEventListener("keyup", function () {
  let movieSearch = allMovies.value;
  let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieSearch}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`;
  getMovies(searchUrl);
  console.log(allMovies.value);
});

/*************search in displayed movies********* */
word.addEventListener("keyup", function () {
  let wordSearch = word.value;
  let moviesLength = movies.length;

  let imgPath = "https://image.tmdb.org/t/p/w500";
  let cartona = "";
  for (let i = 0; i < moviesLength; i++) {
    console.log(typeof movies[i].title);
    console.log(movies[i].title);
    if (movies[i].title.includes(wordSearch)) {
      cartona += `<div  class=" movie col-md-6 col-lg-4 my-3 shadow rounded"> 
                 <div class=" shadow rounded position-relative">
                     <img  class="img-fluid rounded"  src='${
                       imgPath + movies[i].poster_path
                     }'>
                  <div class="layer rounded  d-flex align-items-center flex-column  justify-content-center  text-center ">
                      <h5> ${movies[i].title}</h5>
                      <p>  ${movies[i].overview} <p>
                      <p> ${movies[i].vote_average}</p>
                      <p> ${movies[i].release_date}</p>
                  </div>
    </div>
      </div>`;
    }
    $(".movieRow").html(cartona);
  }
});

/*********************Validation******************************** */
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPhone = document.getElementById("phone");
const inputAge = document.getElementById("age");
const inputPassword = document.getElementById("password");
const inputRePassword = document.getElementById("rePassword");

const nameAlert = document.getElementById("namealert");
const emailAlert = document.getElementById("emailalert");
const phoneAlert = document.getElementById("phoneAlert");
const ageAlert = document.getElementById("ageAlert");
const passwordAlert = document.getElementById("passwordAlert");
const rePasswordAlert = document.getElementById("rePasswordAlert");

const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", function () {
  validateUsername();
  validateEmail();
  validatePhone();
  validateAge();
  validatePassword();
  validateRePassword();

  if (
    validateUsername() == true &&
    validateEmail() == true &&
    validatePhone() == true &&
    validateAge() == true &&
    validatePassword() == true &&
    validateRePassword() == true
  ) {
    alert("You are registed successfully");
  }
});

inputName.addEventListener("blur", validateUsername);
inputEmail.addEventListener("blur", validateEmail);
inputPhone.addEventListener("blur", validatePhone);
inputAge.addEventListener("blur", validateAge);
inputPassword.addEventListener("blur", validatePassword);
inputRePassword.addEventListener("blur", validateRePassword);

function validateUsername() {
  let regex = /[a-z]{3,}/;
  if (regex.test(inputName.value)) {
    nameAlert.style.display = "none";
    return true;
  } else {
    nameAlert.style.display = "block";
    return false;
  }
}

function validateEmail() {
  let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(inputEmail.value)) {
    emailAlert.style.display = "none";

    return true;
  } else {
    emailAlert.style.display = "block";

    return false;
  }
}

function validatePhone() {
  let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regex.test(inputPhone.value)) {
    phoneAlert.style.display = "none";

    return true;
  } else {
    phoneAlert.style.display = "block";

    return false;
  }
}
function validateAge() {
  let regex = /^[1-9][0-9]?$|^100$/;
  if (regex.test(inputAge.value)) {
    ageAlert.style.display = "none";

    return true;
  } else {
    ageAlert.style.display = "block";

    return false;
  }
}

function validatePassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputPassword.value)) {
    passwordAlert.style.display = "none";

    return true;
  } else {
    passwordAlert.style.display = "block";

    return false;
  }
}

function validateRePassword() {
  if (inputPassword.value === inputRePassword.value) {
    rePasswordAlert.style.display = "none";
    return true;
  } else {
    rePasswordAlert.style.display = "block";
    return false;
  }
}
