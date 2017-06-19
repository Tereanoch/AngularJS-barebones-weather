var key = "&appid=21b4247a1b6d6d802cfecc2f26a1e1be&units=imperial";
var cb = "&callback=JSON_CALLBACK";
var url1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var url2 = "http://api.openweathermap.org/data/2.5/forecast?q=";

angular.module('app', ['ngAnimate', 'ui.bootstrap', 'ngSanitize']);
var myapp = angular.module('app', ['ui.bootstrap', 'ngSanitize']);

myapp.factory('myhttp', function ($http, $q) {
    return {
        getOneDay: function (place) {
            var deferred = $q.defer();
            $http.get(url1 + place + key).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        },
        getFiveDay: function (place) {
            var deferred = $q.defer();
            $http.get(url2 + place + key).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        }
    };
});

myapp.controller('TabsDemoCtrl', function ($scope, myhttp) {
    $scope.tab1content = "Current Weather Forecast will be displayed here";
    $scope.tab2content = "Forecast for the next five days will be displayed here";
    $scope.status = {
        isopen: false
    };
    $scope.todo = function () {
        myhttp.getOneDay($scope.location).then(
            function (data) {
                $scope.replace1(data);
            });
        myhttp.getFiveDay($scope.location).then(
            function (data) {
                $scope.replace5(data);
            });
    }

    $scope.replace1 = function (data) {
        var currentWeather = "";
        currentWeather += "City        : " + data.name + "<br>";
        currentWeather += "Temperature : " + data.main.temp + "<br>";
        currentWeather += "Wind Speed  : " + data.wind.speed + "<br>";
        currentWeather += "Weather     : " + data.weather[0].description + "<br>";
        currentWeather += "Humidity    : " + data.main.humidity;
        $scope.tab1content = currentWeather;
    }
    $scope.replace5 = function (data) {
        var temp;
        var fivedayWeather = "";
        var arr = new Array(6);
        for (i = 0; i < 6; i++)
            arr[i] = new Array((5))
        temp = data.list;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 3; j++) {

                arr[i][0] = temp[(8*i +1)].dt_txt.substring(0,10);

                arr[i][1] = temp[(8*i) +1].main.temp;
                arr[i][2] = temp[(8*i) +1].wind.speed;
                arr[i][3] = temp[(8*i) +1].weather[0].description;
                arr[i][4] = temp[(8*i) +1].main.humidity;

            }
        }
        fivedayWeather += "City        :" + data.city.name + "<br>";
        fivedayWeather+=
            "<table>" +
            "<tr>" +
            "<th width=100px>Date</th>" +
            "<th width=100px>Temperature</th>" +
            "<th width=100px>Wind Speed</th>" +
            "<th width=100px>Description</th>" +
            "<th width=100px>Humidity</th>" +
            "</tr>";
        for(i=0;i<5;i++)
        {
            fivedayWeather +="<tr>";
            for(j=0;j<5;j++)
            {
                fivedayWeather += "<td width=100px>";
                fivedayWeather += arr[i][j];
                fivedayWeather += "</td>";
            }
            fivedayWeather+="</tr>"
        }
        fivedayWeather+= "</table>";
        $scope.tab2content = fivedayWeather;
    }
});
