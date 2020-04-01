$(document).ready(function () {

$("#currentDate").text(moment().format('MMMM Do' + ',' + ' YYYY'));

//API ajax call

const apiKey = "f04e167b5e7bea9405c4b7431c3910b6"

const searchWeather = function(city) {
    $("#temperature").empty();
    $("#humidity").empty();
    $("#windSpeed").empty();
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + " &appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {
            $("#temperature").append("Temperature: " + data.main.temp + " °F");
            $("#humidity").append("Humidity: " + data.main.humidity + " %");
            $("#windSpeed").append("Wind Speed: " + data.wind.speed + " mph");
            console.log(data);
            //Call UV ajax function for longitude and latitude
            console.log("UV", data.coord.lat, data.coord.lon)
            getUVIndex(data.coord.lat, data.coord.lon);
            
        }
    });
};

//Make separate ajax call for UV index
const getUVIndex = function(lat, lon) {
    $("#UV").empty();
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {
            $("#UV").append("UV Index: " + "<span id='uvindex'>" +  data.value + "</span>");
            if(data.value < 3) {
                $("#uvindex").addClass("btn-success"); 
            } else if(data.value < 7) {
                $("#uvindex").addClass("btn-warning");
            } else {
                $("#uvindex").addClass("btn-danger");
            }
            console.log("UV Index: ", data.value, " for", lat, "& ", lon);
        }
    });
};
//Make forecast ajax call

const getForecast = function(city) {
    $("#monday").empty();
    $("#tuesday").empty();
    $("#wednesday").empty();
    $("#thursday").empty();
    $("#friday").empty();

    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial",
        dataType: "JSON",
        success: function(data) {

            
                //Card title dates
                $("#monday").append(new Date(data.list[0].dt_txt).toLocaleDateString() + "<br>");
                $("#tuesday").append(new Date(data.list[8].dt_txt).toLocaleDateString() + "<br>");
                $("#wednesday").append(new Date(data.list[17].dt_txt).toLocaleDateString() + "<br>");
                $("#thursday").append(new Date(data.list[25].dt_txt).toLocaleDateString() + "<br>");
                $("#friday").append(new Date(data.list[33].dt_txt).toLocaleDateString() + "<br>");

                //Weather description forecast
                $("#monday").append(data.list[0].weather[0].main + "<br>");
                $("#tuesday").append(data.list[8].weather[0].main + "<br>");
                $("#wednesday").append(data.list[17].weather[0].main + "<br>");
                $("#thursday").append(data.list[25].weather[0].main + "<br>");
                $("#friday").append(data.list[33].weather[0].main + "<br>");
                
                //Temperature forecast
                $("#monday").append(data.list[0].main.temp + " °F" + "<br>");
                $("#tuesday").append(data.list[8].main.temp + " °F" + "<br>");
                $("#wednesday").append(data.list[17].main.temp + " °F" + "<br>");
                $("#thursday").append(data.list[25].main.temp + " °F" + "<br>");
                $("#friday").append(data.list[33].main.temp + " °F" + "<br>");

                //Humidity forecast
                $("#monday").append(data.list[0].main.humidity + " %" + "<br>");
                $("#tuesday").append(data.list[8].main.humidity + " %" + "<br>");
                $("#wednesday").append(data.list[17].main.humidity + " %" + "<br>");
                $("#thursday").append(data.list[25].main.humidity + " %" + "<br>");
                $("#friday").append(data.list[33].main.humidity + " %" + "<br>");

                //Weather icons
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
                $("#monday").append(img);
                img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png");
                $("#tuesday").append(img);
                img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[17].weather[0].icon + ".png");
                $("#wednesday").append(img);
                img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[25].weather[0].icon + ".png");
                $("#thursday").append(img);
                img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[33].weather[0].icon + ".png");
                $("#friday").append(img);

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
