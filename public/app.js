window.onload = function(){
  console.log('App started');

  if (!countries){
    console.log("local countries not found");
    var url = "http://restcountries.eu/rest/v1";
    var request = new XMLHttpRequest;
    request.open("GET", url);
    request.send();
  request.onload = function(){
    if (request.status === 200){
      // STUFF THAT NEEDS THE COUNTRIES DATA
      console.log("api GET successful");
      countries = JSON.parse(request.responseText);
      localStorage.setItem("countries_data", JSON.stringify(countries));
      gotCountriesData();
      // console.log(getNameFromCode("GBR"));
    }; // if request status 200 end
  }; // request.onload end
  } else {
    gotCountriesData();
  }; // if !countries end
  var mainSection = document.querySelector("section.main");
  mainSection.appendChild(dropDown);

  mainSection.appendChild(nameP);
  mainSection.appendChild(populationP);
  mainSection.appendChild(capitalCityP);
  mainSection.appendChild(borderingP);

  dropDown.onchange = function(){
    index = dropDown.value;
    updatePageDisplay(index);
    localStorage.setItem("last_country_index", JSON.stringify(index));
  }

}; // window.onload end
// //////////////////////////////////////////////////////////////////////////////////////////
// STUFF THAT DOESN'T NEED WINDOW LOADED

var countries = JSON.parse(localStorage.getItem("countries_data"));
      // gets previous country from localstorage:
var index = JSON.parse(localStorage.getItem("last_country_index"))

var dropDown = document.createElement("select");
var nameP = document.createElement("p");
var populationP = document.createElement("p");
var capitalCityP = document.createElement("p");
var borderingP = document.createElement("p");


var gotCountriesData = function() {

  for (var i = 0; i < countries.length; i++){
    var option = document.createElement("option");
    option.value = i;
    option.innerText = countries[i].name;
    dropDown.appendChild(option);
  }

  dropDown.value = index;
  getBorderingCountries(index);
  updatePageDisplay(index);
};

var getNameFromCode = function(code){
  for (let i = 0; i < countries.length; i++){
    if (countries[i].alpha3Code == code){
      return countries[i].name;
    }
  }
};

var getBorderingCountries = function(index){
  borderCodes = countries[index].borders;
  borderCountries = borderCodes.map(getNameFromCode);
  return borderCountries;
};

var updatePageDisplay = function(index){
  nameP.innerText = "Country: " + countries[index].name;
  populationP.innerText = "Population: " + countries[index].population;
  capitalCityP.innerText = "Capital City: " + countries[index].capital || "None";
  borderingP.innerText = "Bordering Countries: " + (getBorderingCountries(index) || "No land borders");
};