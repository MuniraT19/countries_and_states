function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return JSON.parse(xmlHttp.responseText);
}

let countries = httpGet("https://xc-countries-api.fly.dev/api/countries/");
console.log(countries);


window.onload = function(){
    let countrySelect = document.getElementById("countrySelect");
    for (i=0; i<countries.length; i++){ 
        console.log(countries[i]);
        let opt = document.createElement("option");
        opt.value=countries[i].code;
        opt.text=countries[i].name;
        countrySelect.add(opt);

    }

    console.log(countrySelect);
};