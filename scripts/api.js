



async function callWeatherAPI(zip){
    const zipCurrWeather = `http://api.weatherapi.com/v1/current.json?key=ed86dd702e284994b23185750250903&q=${zip}`
    try{
        const response = await fetch(zipCurrWeather);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const json = response.json();
        console.log(json)
    }
    catch (error){
        console.error(error.message);
    }
}