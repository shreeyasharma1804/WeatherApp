require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const OPEN_WEATHER_API = process.env.OPEN_WEATHER_API;

app.post("/weather", (req, res) => {
    place = req.body.location;
    console.log(place);
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${OPEN_WEATHER_API}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            latitude = data[0].lat;
            longitude = data[0].lon;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API}`;
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    res.json(data);
                });
        });
});

app.listen(3000, () => {
    console.log("Listening");
});
