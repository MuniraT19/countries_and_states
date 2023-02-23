function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    response = JSON.parse(xmlHttp.responseText);
    // adding an empty option to the beginning of the array using "unshift"
    response.unshift({id: 0, code: "", name: "(nothing selected)"});
    return response;
}

let countries = httpGet("https://xc-countries-api.fly.dev/api/countries/");
console.log(countries);


window.onload = function(){
    let countrySelect = document.getElementById("countrySelect");
    // remove previous options
    for (i=countrySelect.options.length-1; i>=0; i--) {
        countrySelect.remove(i);
    }
    for (i=0; i<countries.length; i++){ 
        console.log(countries[i]);
        let opt = document.createElement("option");
        opt.value=countries[i].code;
        opt.text=countries[i].name;
        countrySelect.add(opt);
    }
};

function callStatesApi() {
    let states = [];
    let countrySelect = document.getElementById("countrySelect");
    let selectedCountryCode = countrySelect.value;
    let apiURL = "https://xc-countries-api.fly.dev/api/countries/" + selectedCountryCode + "/states/";
    states = httpGet(apiURL);
    console.log(states);
    generateStatesSelector(states);
};

function generateStatesSelector(stateList) {
    let stateSelect = document.getElementById("stateSelect");
    // remove previous options
    for (i=stateSelect.options.length-1; i>=0; i--) {
        stateSelect.remove(i);
    }
    for (i=0; i<stateList.length; i++){ 
        console.log(stateList[i]);
        let opt = document.createElement("option");
        opt.value=stateList[i].code;
        opt.text=stateList[i].name;
        stateSelect.add(opt);
    }
}

function sortByName(resObj) {
    // sorting the array by name
    resObj.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    return resObj;
}