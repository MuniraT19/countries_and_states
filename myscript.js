// console.log("JS is working");
let countries = null;
fetch("https://xc-countries-api.fly.dev/api/countries/")
    .then(response => response.json())
    .then(data => {
        countries = data;
        console.log("countries", countries);
    });
window.onload = function(){
    // const countries = ["United States", "Canada", "Mexico", "Brazil", "Argentina", "Peru", "Chile", "Colombia", "Venezuela", "Uruguay"];
          const countrySelect = document.getElementById("countrySelect");
    
          // Loop through the countries array and add each country to the dropdown
          for (let i = 0; i < countries.length; i++) {
            const option = document.createElement("option");
            option.text = countries[i].name;
            option.value = countries[i].code;
            countrySelect?.add(option);
            console.log(countrySelect)
          }
 };