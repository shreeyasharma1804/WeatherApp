require('dotenv').config();
const OPEN_WEATHER_API = process.env.OPEN_WEATHER_API;
const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.json());
app.use(express.static('public'));


app.post('/weather',(req,res)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${OPEN_WEATHER_API}`;
    axios({
        url: url,
        responseType: 'json'
      }).then( data =>{
        res.json(data.data);
      })


})

app.listen(3000,()=>{
    console.log('Listening')
});