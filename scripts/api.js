



// This is my AI Function! 
// My AI of choice is Claude 3.7 Sonnet
// Query Used ->
// "I am currently working on a basic weather app that uses JavaScript, HTML, and Tailwindcss. I am fetching this json 
// {"location": {
//    "name": "Yukon",
//    "region": "Oklahoma",
//    "country": "USA",
//    "lat": 35.4976997375488,
//    "lon": -97.7322998046875,
//    "tz_id": "America/Chicago",
//    "localtime_epoch": 1741735870,
//    "localtime": "2025-03-11 18:31"
//    },
//    "current": {
//    "temp_c": 25.0,
//    "temp_f": 77.0,
//    "is_day": 1,
//    "condition": {
//    "text": "Sunny",
//    "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
//    "code": 1000
//    },
//    "cloud": 0,
//    "feelslike_c": 25.0,
//    "feelslike_f": 77.1
//    }
//    }
   
//    And would like help creating a JavaScript function called createWeatherCard that takes in a json parameter that returns Some HTML elements that dynamically display the json values. 
//    I am think to start we could display "icon", "Name","Region","temp_f","condition:text".
   
//    Here is my current backend code:
   
//    function createWeatherCard(json){
   
//    }
   
//    async function callWeatherAPI(zip){
//        const zipCurrWeather = http://api.weatherapi.com/v1/current.json?key=ed86dd702e284994b23185750250903&q=${zip}
//        try{
//            const response = await fetch(zipCurrWeather);
//            if(!response.ok){
//                throw new Error(Response status: ${response.status});
//            }
//            const json = response.json();
//            createWeatherCard(json)
//        }
//        catch (error){
//            console.error(error.message);
//        }
//    }
   
//    and my front end code
   
//    <!DOCTYPE html>
//    <html lang="en">
//    <head>
//        <meta charset="UTF-8">
//        <meta name="viewport" content="width=device-width, initial-scale=1.0">
//        <title>Weather App</title>
//        <link rel="stylesheet" href="../css/output.css">
//    </head>
//    <body>
//        <header>
   
//        </header>
//        <main>
//            <button onclick="callWeatherAPI(73099)">Test</button>
//        </main>
//        <footer>
   
//        </footer>
//        <script src="../scripts/api.js"></script>
//    </body>
//    </html>"
// ------- End of Query --------

// I probably would have would have created a string of html elements and parsed the json on where I wanted the data in the html and returned it like a react component.
// But this works to. 
// I am very impressed by the styling though. 
// I didn't expect much styling at all.
// It also corrected a mistake I made in the other function.
function createWeatherCard(json) {
    // Extract the data we need from the JSON
    const { location, current } = json;
    
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto my-4';
    
    // Create weather header with location info
    const header = document.createElement('div');
    header.className = 'flex justify-between items-center mb-4';
    
    // Location information
    const locationInfo = document.createElement('div');
    
    const cityName = document.createElement('h2');
    cityName.className = 'text-2xl font-bold text-gray-800';
    cityName.textContent = location.name;
    
    const regionInfo = document.createElement('p');
    regionInfo.className = 'text-gray-600';
    regionInfo.textContent = `${location.region}, ${location.country}`;
    
    locationInfo.appendChild(cityName);
    locationInfo.appendChild(regionInfo);
    
    // Weather icon
    const iconContainer = document.createElement('div');
    iconContainer.className = 'flex items-center justify-center';
    
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
    weatherIcon.className = 'w-16 h-16';
    
    iconContainer.appendChild(weatherIcon);
    
    // Add location and icon to header
    header.appendChild(locationInfo);
    header.appendChild(iconContainer);
    
    // Temperature and condition
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'mt-4';
    
    const temperature = document.createElement('div');
    temperature.className = 'flex items-end';
    
    const tempValue = document.createElement('span');
    tempValue.className = 'text-5xl font-bold text-gray-800';
    tempValue.textContent = `${Math.round(current.temp_f)}°F`;
    
    temperature.appendChild(tempValue);
    
    const condition = document.createElement('p');
    condition.className = 'text-xl text-gray-600 mt-2';
    condition.textContent = current.condition.text;
    
    // Additional weather details
    const feelsLike = document.createElement('p');
    feelsLike.className = 'text-gray-600 mt-1';
    feelsLike.textContent = `Feels like: ${Math.round(current.feelslike_f)}°F`;
    
    // Add all elements to the card
    weatherInfo.appendChild(temperature);
    weatherInfo.appendChild(condition);
    weatherInfo.appendChild(feelsLike);
    
    card.appendChild(header);
    card.appendChild(weatherInfo);
    
    // Append the card to the main element in the document
    const main = document.querySelector('main');
    main.appendChild(card);
    
    return card;
}
let count = 0
async function callWeatherAPI(){
    let city = document.getElementById("city").value
    const zipCurrWeather = `https://api.weatherapi.com/v1/current.json?key=ed86dd702e284994b23185750250903&q=${city}`
    try{
        const response = await fetch(zipCurrWeather);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        createWeatherCard(json)
        if (count >= 6){
            let main = document.querySelector("main")
            let elements = main.getElementsByTagName("div")
            main.removeChild(elements[0]);
        }
        count++;
    }
    catch (error){
        console.error(error.message);
    }
}