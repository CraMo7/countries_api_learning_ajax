window.onload = function(){
  console.log('App started');

  var url = "http://restcountries.eu/rest/v1";
  var request = new XMLHttpRequest;
  request.open("GET", url);

  request.onload = function(){
    if (request.status === 200){
      // STUFF THAT NEEDS THE COUNTRIES DATA
      console.log("api GET successful");
      countries = JSON.parse(request.responseText);
      
      // gets previous country from localstorage:
      index = JSON.parse(localStorage.getItem("last_country_index"));

      for (var i = 0; i < countries.length; i++){
        var option = document.createElement("option");
        option.value = i;
        option.innerText = countries[i].name;
        dropDown.appendChild(option);
      }
      
      dropDown.value = index;

      showBordering(index);

      updatePageDisplay(index);

      dropDown.onchange = function(){
        index = dropDown.value;
        updatePageDisplay(index);

        localStorage.setItem("last_country_index", JSON.stringify(index));
      }


      // console.log(getNameFromCode("GBR"));



    } // if request status 200
  }; // request.onload end
  request.send();

  //STUFF THAT NEEDS THE PAGE TO LOAD
  var mainSection = document.querySelector("section.main");
  mainSection.appendChild(dropDown);

  mainSection.appendChild(nameP);
  mainSection.appendChild(populationP);
  mainSection.appendChild(capitalCityP);
  mainSection.appendChild(borderingP);

}; // window.onload end

// STUFF THAT DOESN'T NEED WINDOW LOADED
var dropDown = document.createElement("select");
var nameP = document.createElement("p");
var populationP = document.createElement("p");
var capitalCityP = document.createElement("p");
var borderingP = document.createElement("p");


var showBordering = function(index){
  borderCodes = countries[index].borders;
  borderCountries = borderCodes.map(getNameFromCode);
  return borderCountries;
}

var getNameFromCode = function(code){
  for (let i = 0; i < countries.length; i++){
    if (countries[i].alpha3Code == code){
      return countries[i].name;
    }
  }
}

var updatePageDisplay = function(index){
  nameP.innerText = "Country: " + countries[index].name;
  populationP.innerText = "Population: " + countries[index].population;
  capitalCityP.innerText = "Capital City: " + countries[index].capital;
  borderingP.innerText = "Bordering Countries: " + showBordering(index);
}

var index;
var countries;
