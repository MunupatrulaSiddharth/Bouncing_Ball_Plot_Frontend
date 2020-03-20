var app = angular.module('BouceBallApp', [])


app.controller('BallController', function ($scope, $http) {
    
    var apiUrl = "http://localhost:8000/";
  
var slider = document.getElementById("myRange");
var mu1 = slider.value; 

slider.oninput = function() {
      mu1 = this.value;
      //http request to fetch array for given coefficient of restitution
       var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
      $http.get(apiUrl + "fetchArrayForGivenMu/" + mu1, config).then(function (response) {
        $scope.arr1 = response.data;
        console.log(response.data);
        return { data: response.data };
    })
    
      var myConfig = {
        "type": "line",
        "plot": {
          "aspect": "spline",
        },
        "series": [{
          "values":  $scope.arr1 
        }]
      };
   
      zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: "100%",
        width: "100%"
      });
}
});