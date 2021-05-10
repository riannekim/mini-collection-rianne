// console.log("Is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "key4WsseIKOvg2Qnf" }).base(
  "app4s5s308zvV6JZn"
);

// get our collection base, select all the records
// specify functions that will receive the data
base("movies")
  .select({})
  .eachPage(gotPageOfFilms, gotAllFilms);

// an empty array to hold our data
var films = [];

// callback function that receives our data
function gotPageOfFilms(records, fetchNextPage) {
  // add the records from this page to our array
  films.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllFilms(err) {
  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }
  // call functions to log and show the books
  consoleLogFilms();
  showFilms();
}

// just loop through the books and console.log them
function consoleLogFilms() {
  console.log("consoleLogFilms()");
  films.forEach(film => {
    console.log("Film:", film);
    console.log(film.fields.filmPic[0].url);
  });
}

// look through our airtable data, create elements
function showFilms() {
  console.log("showFilms()");
  films.forEach(film => {
    // create container for each fruit
    var filmContainer = document.createElement("div");
    filmContainer.classList.add("film-container");
    document.querySelector(".container").append(filmContainer);
  
    // add all the fruit names as h1 
    var filmName = document.createElement("h1");
    filmName.classList.add("title");
    filmName.innerText = film.fields.title; 
    filmContainer.append(filmName);
    
    // add all the pics 
    var filmPic = document.createElement("img");
    filmPic.classList.add("poster");
    filmPic.src = film.fields.poster[0].url;
    filmContainer.append(filmPic);

    // create a css class for each fruit with corresponding fruit color 
    var filmColor = film.fields.release_season;
    console.log(filmColor );
    filmColor.forEach(function(color) {
      filmContainer.classList.add(color);
    });

    // when press button for red, get red fruit color by looking for .Red class added by line 75-77
    var filterYellow = document.querySelector(".spring");
    filterYellow.addEventListener("click", function() {
      if (filmContainer.classList.contains("spring")) {
        filmContainer.style.background = "spring";
      } else {
        filmContainer.style.background = "white";
      }
    });
    // same logic as previous 
    var filterGreen = document.querySelector(".summer");
    filterGreen.addEventListener("click", function() {
      if (filmContainer.classList.contains("summer")) {
        filmContainer.style.background = "summer";
      } else {
        filmContainer.style.background = "white";
      }
    });
    // same logic as previous 
    var filterOrange = document.querySelector(".fall");
    filterOrange.addEventListener("click", function() {
      if (filmContainer.classList.contains("brown")) {
        filmContainer.style.background = "brown";
      } else {
        filmContainer.style.background = "white";
      }
    });
    // same logic as previous 
    var filterBlue = document.querySelector(".winter");
    filterBlue.addEventListener("click", function() {
      if (filmContainer.classList.contains("winter")) {
        filmContainer.style.background = "winter";
      } else {
        filmContainer.style.background = "white";
      }
    });
  });
}
