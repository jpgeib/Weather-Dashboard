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
            console.log("UV", data.coord.lat, data.coord.lon)
            getUVIndex(data.coord.lat, data.coord.lon);
            
        }
    });
};

//Make separate ajax call for UV index
const getUVIndex = function(lat, lon) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {
            $("#UV").append("<span id='uvindex'>" + data.value + "</span>");
            console.log("UV Index: ", data.value, " for", lat, "& ", lon);
        }
    });
};
//Make forecast ajax call

const getForecast = function(city) {
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey,
        dataType: "JSON",
        success: function(data) {
            for(let i = 0; i < data.list.length; i++) {
                $("monday").append(data.list[0].weather[0].main);
                $("tuesday").append(data.list[8].weather[0].main);
                // $("wednesday").append(data.list[2].weather[2].main);
                // $("thursday").append(data.list[3].weather[3].main);
                // $("friday").append(data.list[4].weather[4].main);
                console.log(data.list.weather[0].main);
                // console.log(data.list[1].weather[1].main);
                // console.log(data.list[2].weather[2].main);
                // console.log(data.list[3].weather[3].main);
                // console.log(data.list[4].weather[4].main);
            }
        }
    });
};


$("#search-button").on("click", function(event) {
    event.preventDefault();
    var city = $("#searchInput").val();
    console.log(city);
    searchWeather(city);
    getForecast(city);
});



});
