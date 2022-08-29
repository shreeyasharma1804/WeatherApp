const icon = new Skycons({ color: "blue" });
icon.set("icon", "partly-cloudy-day");
icon.play();

function update() {
    place = document.getElementById("data-city-search").value;
    fetch("/weather", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ location: place }),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            wind = data.wind.speed;
            temperature = data.main.temp;
            humidity = data.main.humidity;
            console.log(data);
            document.getElementById('data-wind').innerHTML = wind;
            document.getElementById('data-temperature').innerHTML = temperature;
            document.getElementById('data-humidity').innerHTML = humidity;
            
        });
}
