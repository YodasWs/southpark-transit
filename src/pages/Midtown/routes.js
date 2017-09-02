'use strict';

angular.module('pageMidtown')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/Midtown/', {
		templateUrl: 'pages/Midtown/Midtown.html',
		controller: 'ctrlMidtown',
		controllerAs: '$ctrl',
	})
}])
.controller('ctrlMidtown', function() {
	angular.element('[ng-view]').attr('ng-view', 'pageMidtown')
	// Google Static Maps Guide: https://developers.google.com/maps/documentation/static-maps/intro
	this.mapFeatures = {
		size: '500x640',
		scale: 2,
		maptype: 'roadmap',
		path: [
			[ // Gold Line
				'color:0xffff00b0',
				'Elizabeth Ave & S Kings Dr, Charlotte NC',
				'Elizabeth Ave & Hawthorne Ln, Charlotte NC',
				'Hawthorne Ln & Bay St, Charlotte NC',
				'Hawthorne Ln & Central Ave, Charlotte NC',
				'Central Ave & Pecan Ave, Charlotte NC',
				'Central Ave & Ivey Dr, Charlotte NC',
				'35.217212,-80.792314', // Central Ave & Eastcrest Dr
			],
			[ // Providence Line
				'color:0xffa500b0',
				'35.213229,-80.830223', // 3rd St before Torrence St
				'35.215453,-80.832985', // S Kings Dr & 3rd St
				'35.216377,-80.832511', // S Kings Dr & 4th St
				'35.215969,-80.831854', // 3rd St & 4th St
				'35.213229,-80.830223', // 3rd St before Torrence St
				'35.210629,-80.827172', // 3rd St after Hawthorne Ln
				'35.207824,-80.824377', // Providence Rd & S Colonial Ave
				'35.205769,-80.824143', // Providence Rd & Alberto St
				'35.200977,-80.825140', // Providence Rd & Fenton Pl
				'35.195876,-80.827237', // Providence Rd & Queens Rd
				'35.191460,-80.823684', // Providence Rd & Cherokee Rd
				'35.177654,-80.817861', // Providence Rd & S Wendover Rd
				'35.171268,-80.808254', // Sharon Ln & Providence Rd
				'35.172665,-80.805914', // S Sharon Amity Rd & Crosby Rd
				'35.171839,-80.805297', // Crosby Rd & Orient Rd
				'35.170430,-80.807229', // Orient Rd & Providence Rd
				'35.171268,-80.808254', // Sharon Ln & Providence Rd
			],
		],
		markers: [
			[ // Park-and-ride Garages
				'color:green',
				'label:P',
				'35.171086,-80.807028', // Orient Rd Parking Deck
			],
			[ // Streetcar stations
				'size:small',
				'35.215915,-80.832748', // S Kings Dr
				'35.213229,-80.830223', // 3rd St before Torrence St
				'35.210629,-80.827172', // 3rd St after Hawthorne Ln
				'35.206002,-80.824158', // Providence Rd and Alberto St
				'35.202360,-80.824920', // Providence Rd after Cherokee Rd
				'35.196657,-80.826906', // Providence Rd btwn Huntley Pl and Perrin Pl
			],
		],
	}
})
