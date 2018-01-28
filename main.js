
var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});

	// create the module and name it greedyGameApp
angular.module('greedyGameApp', ['ui.bootstrap']);

	// create the controller and inject Angular's $scope
	angular.module('greedyGameApp').controller('mainController', function($scope, $http, $filter) {
          //Date options
          $scope.fromDate= new Date(), $scope.toDate=null, $scope.response = null;
          $scope.noData = "To fetch the data please submit valid data";
        
          $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 0,
            showWeeks: false,
            yearRange: 20,
            allowInvalid: true,
            datepickerMode: 'year'
        };
         //Decide whether list to open/close
         $scope.fromDtOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.isOpen = true;
            $scope.isToOpen = false;
          };
          $scope.toDtOpen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.isToOpen = true;
            $scope.isOpen = false;
          };
          
          $scope.dateChangeHandler = function(){
            $scope.toDate=null;
            $scope.minDate = new Date($scope.fromDate);
            $scope.minDate.setDate($scope.minDate.getDate() + 1);
          };
          $scope.dateChangeHandler();
           // function to submit the form after all validation has occurred            
            $scope.submitForm = function(isValid) {
                // check to make sure the form is completely valid
                if (isValid) {
                    //call adrequest api based on from and to dates
                    var fDate = $filter('date')($scope.fromDate, "yyyy-MM-dd"),
                        tDate = $filter('date')($scope.toDate, "yyyy-MM-dd");
                    var url = "http://104.197.128.152/data/adrequests?from="+fDate+"&to="+tDate;
                    $http.get(url)
                    .then(function successCallback(res){
                        if(res && res.data && res.data.data.length>0){
                            $scope.response =  res.data.data;
                        }else{
                            $scope.noData = "Data not found";
                        }
                    }, function errorCallback(response){
                        $scope.noData = "Unable to perform get request";
                    });
                }

            };
          
	});

