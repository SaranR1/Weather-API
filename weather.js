// const apiurl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=c5f4c9ecb2197a15e59740bce40fb118";

// const forecastel = document.getElementById('forecast');
// fetch(apiurl).then(response=> response.json() ).then(data => {
//     const temp = data.main.temp;
//     const weather = data.weather[0].description;
//     const iconurl = 'http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png';

//     const html = ' <img src = "${iconurl}" alt="Weather icon"/> <p> Temperature:${temp}</p>  <p>Weather: ${Weather</p>';
//     forecastel.innerHTML = html;
// })
// .catch(error => {
//     console.error(error);
//     forecastel.textContent = "Error loading forecast";
// });

let weather={
    "apiKey": "c5f4c9ecb2197a15e59740bce40fb118",
    fetchweather:function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&appid="
        +this.apiKey
        ).then(response=> response.json())
        .then((data)=> this.displayWeather(data))
    },
    displayWeather :function(data){
        const{ name } = data;
        const {icon, description} = data.weather[0];
        const {temp,humidity} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        document.querySelector(".city").innerText = "Weather in "+ name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = Math.round(temp-273)+"°C";
        document.querySelector(".humidity").innerText = "Humidity: "+humidity+"%";
        document.querySelector(".wind").innerText = "Wind speed: "+speed+"km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"+landmark')"
    },
    search:function(){
        this.fetchweather(document.querySelector(".search-bar").value);
    }
};

document
    .querySelector(".search button")
    .addEventListener("click",function(){
        weather.search();
    });

document.querySelector(".search-bar").addEventListener("keyup",function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchweather("Chennai");