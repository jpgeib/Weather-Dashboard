$(document).ready(function () {

$("#currentDate").text(moment().format('MMMM Do' + ',' + ' YYYY'));

//API ajax call

const apiKey = "f04e167b5e7bea9405c4b7431c3910b6"

const searchWeather = function(city) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + " &appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {
            $("#temperature").append(data.main.temp + " °F");
            $("#humidity").append(data.main.humidity + " %");
            $("#windSpeed").append(data.wind.speed + " mph");
            console.log(data);
            //Call UV ajax function for longitude and latitude
            // getUVIndex(data.coord.lat, data.coord.lon);
            //Call forecast function
        }
    });
};

//Make separate ajax call for UV index
const getUVIndex = function(lat, lon) {
    $.ajax({
        type: "GET",
        url: "api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {
            $("#UV").append(data.coord.lat + "°, " + data.coord.lon + "°");
            console.log(data);
        }
    });
};
//Make forecast ajax call

const getForecast = function(city) {
    $.ajax({
        type: "GET",
        url: "api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=7&appid=" + apiKey,
        dataType: "JSON",
        success: function(data) {
            for(let i = 0; i <data.list.length; i++) {
                $("monday").append(data.list[0]);
                $("tuesday").append(data.list[1]);
                $("wednesday").append(data.list[2]);
                $("thursday").append(data.list[3]);
                $("friday").append(data.list[4]);
                console.log(data);
            }
        }
    });
};


$("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#searchInput").val();
    console.log(city);
    searchWeather(city);
    getUVIndex();
    getForecast(city);
});



});
