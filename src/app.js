'use strict';

angular.module('myApp', [
	'compGoogleMap',
	'pageParking',
	'pageHome',
	'ngRoute',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'ctrlSVG',
		controllerAs: '$ctrl',
	})
	.otherwise({redirectTo: '/'})
}])
