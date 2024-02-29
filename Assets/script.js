async function fetchWeatherData(city){
    const apiKey = "2ab653a55fc4fe425fefc24af2ed4e39";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Failed to fetch weather");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching weather: ", error);
        return null;
    }
}

//adds weather data to DOM
function renderWeatherData(data) {
    document.getElementById('selected-location').textContent = data.name;
    document.getElementById('today-temp').textContent = `Temp: ${data.main.temp} celcius `;
    document.getElementById('today-wind').textContent = `Wind: ${data.wind.speed} m/s `;
    document.getElementById('today-humidity').textContent = `Humidity: ${data.main.humidity}% `;
};

    //event listener for submit button
    document.querySelector(".search-form").addEventListener('submit', async function(event){
        event.preventDefault();

        const city = document.getElementById("input").value;

        if(city) {
            const weatherData = await fetchWeatherData(city);
            if(weatherData) {
                renderWeatherData(weatherData);
            } else {
                alert("Failed to fetch weather data. Try again.");
            } 
            } else {
                alert("Please enter a city name.");
        } 
    });

function fetchSearchHistory() {
    const searchHistory = localStorage.getItem('searchHistory');
    if(searchHistory) {
        return JSON.parse(searchHistory);
    } else {
        return [];
    }
}

function updateSearchHistory() {
    const searchHistoryContainer = document.getElementById('search-history');
    searchHistoryContainer.innerHTML = "";

    searchHistory.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.classList('search-history-item'); //change class
        searchHistoryContainer.appendChild(button);

        button.addEventListener("click", () => {
            document.querySelector('search-form input').value = city; //verify this
            document.querySelector('search-form').dispatchEvent(new Event('submit'))
        });
    });
};

function loadSearchHistory() {
    const fetchedSearchHistory = fetchSearchHistory();
    updateSearchHistory(fetchSearchHistory);
}

document.addEventListener('DOMContentLoaded', loadSearchHistory);


// fetch("api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}").then(response => {
//     if(!response.ok){
//         throw new Error('Network response was not okay');
//     }

//     return response.JSON();
// }).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.log("There was a problem with the fetch operation: ", error);
// });

