const apikey = //Your API
const apiurl = //Your URL

const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-icon');
const weatherimg = document.querySelector('.weather-img');

async function checkWeather(cityName) {
    try {
        // Ensure the city name is valid
        if (!cityName) {
            alert('Please enter a city name');
            return;
        }

        // Fetch weather data
        const response = await fetch(apiurl + cityName + `&appid=${apikey}`);

        if (!response.ok) {
            alert('City not found or invalid API request');
            return;
        }

        const data = await response.json();

        // Check if the city exists in the response
        if (data.cod !== 200) {
            alert('City not found');
            return;
        }

        console.log(data);

        // Update UI elements with the fetched data
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + '°C';
        humidity.innerHTML = data.main.humidity + '%';
        wind.innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main == "Clouds") {
            weatherimg.src = 'weather/clouds.png';
        }
        else if (data.weather[0].main == 'Clear') {
            weatherimg.src = 'weather/clear.png';
        }
        else if (data.weather[0].main == 'Rain') {
            weatherimg.src = 'weather/rain.png';
        }
        else if (data.weather[0].main == 'Drizzle') {
            weatherimg.src = 'weather/drizzle.png';
        }
        else if (data.weather[0].main == 'Mist') {
            weatherimg.src = 'weather/mist.png';
        }
        else if (data.weather[0].main == 'Snow') {
            weatherimg.src = 'weather/snow.png';
        }

    }

    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    checkWeather(cityName);
});

// Optional: Allow pressing "Enter" to trigger the search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        const cityName = searchBox.value.trim();
        checkWeather(cityName);
    }
});




