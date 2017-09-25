'use strict';

angular.module('myApp', [
	'compGoogleMap',
	'pageSouthPark',
	'pageSouthParkParking',
	'pageMidtown',
	'directives',
	'ngRoute',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false);
	$routeProvider.otherwise({redirectTo: '/SouthPark'})
}])
