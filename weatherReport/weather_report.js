function showweatherDetails(event) {
    event.preventDefault();
    
    const city = document.getElementById('city').value;
    const apiKey = 'a5504f9f2164809dbfa94c4be11d885b';

    // get geolocation
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                                            <p>Temperature: ${data.main.temp} &#8451;</p>
                                            <p>Weather: ${data.weather[0].description}</p>`;
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    const weatherInfo = document.getElementById('weatherInfo');
                    weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
                });
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch geo location. Please try again.</p>`;
          });
          


}

document.getElementById('weatherForm').addEventListener('submit',showweatherDetails );

