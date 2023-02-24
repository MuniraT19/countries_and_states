function httpGet(theUrl) {
    return fetch(theUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // adding an empty option to the beginning of the array using "unshift"
            data.unshift({ id: 0, code: "", name: "(nothing selected)" });
            data = sortByName(data);
            return data;
        })
        .catch(error => {
            console.log('Fetch error:', error);
            return [];
        });
}

let countries = [];
httpGet('https://xc-countries-api.fly.dev/api/countries/')
    .then(data => {
        countries = data;
        console.log(countries);
        let countrySelect = document.getElementById('countrySelect');
        // remove previous options
        for (i = countrySelect.options.length - 1; i >= 0; i--) {
            countrySelect.remove(i);
        }
        for (i = 0; i < countries.length; i++) {
            console.log(countries[i]);
            let opt = document.createElement('option');
            opt.value = countries[i].code;
            opt.text = countries[i].name;
            countrySelect.add(opt);
        }
    })
    .catch(error => {
        console.log('Error getting countries:', error);
    });

function callStatesApi() {
    let countrySelect = document.getElementById('countrySelect');
    let selectedCountryCode = countrySelect.value;
    let apiURL =
        'https://xc-countries-api.fly.dev/api/countries/' +
        selectedCountryCode +
        '/states/';
    httpGet(apiURL)
        .then(states => {
            console.log(states);
            generateStatesSelector(states);
        })
        .catch(error => {
            console.log('Error getting states:', error);
        });
}

function generateStatesSelector(stateList) {
    let stateSelect = document.getElementById('stateSelect');
    // remove previous options
    for (i = stateSelect.options.length - 1; i >= 0; i--) {
        stateSelect.remove(i);
    }
    for (i = 0; i < stateList.length; i++) {
        console.log(stateList[i]);
        let opt = document.createElement('option');
        opt.value = stateList[i].code;
        opt.text = stateList[i].name;
        stateSelect.add(opt);
    }
}

function sortByName(resObj) {
    // sorting the array by name
    resObj.sort(function (a, b) {
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


function onSubmit(event) {
    var countryInput = document.getElementById("countryInput");
    var countryCodeInput = document.getElementById("countryCodeInput");

    var payload = {
        code: countryCodeInput.value,
        name: countryInput.value
    };
    var url = "https://xc-countries-api.fly.dev/api/countries/";
    console.log(payload);

    fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => console.log(json));

}