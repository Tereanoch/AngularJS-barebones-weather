var key = "&appid=21b4247a1b6d6d802cfecc2f26a1e1be";
var url1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var url2 = "http://api.openweathermap.org/data/2.5/weather?zip=";

angular.module('app', ['ngAnimate', 'ui.bootstrap']);


// angular.module('app', [ui.bootstrap]).factory('owmFactory',function($http)
// {
//     var getOneDayData = function()
//     {
//
//     }
// });

angular.module('app', ['ui.bootstrap']).controller('TabsDemoCtrl', function ($scope,$http
    // , owmFactory
) {
    var myData;
    $scope.tabs = [
        {title: 'Current', content: 'as'},
        {title: 'Five Day Forecast', content: 'sas'}
    ];
    $scope.status = {
        isopen: false
    };
    $scope.todo = function () {
        var oneday = $scope.getOneDayForecast();
        var fiveday = $scope.getFiveDayForecast();
        console.log(oneday);
        console.log(fiveday);
    }
    $scope.getOneDayForecast = function () {
        $http.get("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.location + key).then
        (
            function (response) {
                myData = response;
            },
            function (response) {
                myData = "Something went wrong";
            }
        );
        console.log(myData);
    }
    $scope.getFiveDayForecast = function () {
        $http.get("http://api.openweathermap.org/data/2.5/forecast?q=" + $scope.location + key).then
        (
            function (response) {
                myData = response;
            },
            function (response) {
                myData = "Something went wrong";
            }
        );
        console.log(myData);
    }
});
