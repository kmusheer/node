const { default: axios } = require("axios");
const express = require("express");
require('dotenv').config()
const cors = require('cors');
const port = 3000;

const app = express();  // express  app instance
app.use(cors());

const API_KEY = process.env.API_KEY;

app.get("/", async(req, res) => {
    // res.send("Hello World!");
    try {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        // console.log('city', city);
        // console.log('url', url);
        // axios.get(url).then((response) => {
            const response = await axios.get(url);
            const data = response.data

            const cityName = data.name;
            const lon = data.coord.lon;
            const lat = data.coord.lat;
            const temperature = data.main.temp;
            console.log('temperature', temperature)
            const feelsLike = data.main.feels_like;
            const weatherDescription = data.weather[0].description;
            const visibility = data.visibility;
            const timezone = data.timezone;
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });


            const weatherHTML = `
            <div style="background-color: #f0f0f0; border-radius: 10px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <h2 style="font-size: 24px; margin-bottom: 10px;">${cityName}</h2>
                <p style="font-size: 16px; margin-bottom: 5px;">Longitude: <span style="font-weight: bold;">${lon}°C</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Latitude: <span style="font-weight: bold;">${lat}°C</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Temperature: <span style="font-weight: bold;">${temperature}°C</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Feels like: <span style="font-weight: bold;">${feelsLike}°C</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Weather: <span style="font-weight: bold;">${weatherDescription}</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Visibility: <span style="font-weight: bold;">${visibility} meters</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Timezone: <span style="font-weight: bold;">${timezone / 3600} hours from UTC</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Sunrise: <span style="font-weight: bold;">${sunrise}</span></p>
                <p style="font-size: 16px; margin-bottom: 5px;">Sunset: <span style="font-weight: bold;">${sunset}</span></p>
            </div>`;

            res.send(weatherHTML);
        // })
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(400).send("Error fetching weather data. Please check the city name and try again.");
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
}); // listen   on port 3000    