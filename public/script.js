get_lat_long().then(data =>{
  latitude = data[0].lat;
  longitude = data[0].lon;
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "latitude": latitude,
      "longitude": longitude

    })
  }).then(res => res.json()).then(data => {
    setWeatherData(data);
  })

})

const icon = new Skycons({ color: 'blue' })
const locationElement = document.querySelector('[data-location]');
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')

icon.set('icon', 'partly-cloudy-day')
icon.play()

function setWeatherData(data){
  console.log(data);
  locationElement.textContent = data.name;
  statusElement.textContent = data.weather[0].description;
  console.log(data.weather[0].description);
  temperatureElement.textContent = data.main.temp;
  windElement.textContent = data.wind.speed;
  precipitationElement.textContent = data.main.humidity;

}


async function get_lat_long(){
  let place = await document.getElementById('data-city-search').value;
  console.log(place);
  let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=c2a4f243c670c89b4bfe6329f90f958d`)
  let data = await response.json();
  console.log(data)
  return data;
}