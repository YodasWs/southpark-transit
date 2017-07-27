'use strict';

angular.module('pageParking')
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$routeProvider.when('/parking', {
		templateUrl: 'pages/parking/parking.html',
		controller: 'ctrlParking',
		controllerAs: '$ctrl',
	})
}])
.controller('ctrlParking', function() {
	angular.element('[ng-view]').attr('ng-view', 'pageParking')
	// Google Static Maps Guide: https://developers.google.com/maps/documentation/static-maps/intro
	let opts = {
		key: 'AIzaSyBnow4ZVuX0dXXj8c0o_OinH0SBZbujPqg',
		center: 'SouthPark, Charlotte NC',
		maptype: 'hybrid',
		size: '600x500',
		zoom: 5,
	}

	this.mapFeatures = {
		markers: [
			[ // Park-and-ride Garages
				'color:green',
				'label:P',
				'35.149478,-80.841491', // Park South Dr Garage
				'35.147144,-80.823559', // Fairview Rd & Cameron Valley Pkwy
				'35.157710,-80.822967', // Sharon Rd and Sharon Twp Ln
				'35.146582,-80.833177', // Sharon Rd and Ashley Park Ln
			],
			[ // Streetcar stations
				'size:small',
				'35.149984,-80.842418', // Park South Dr Station
				'35.146664,-80.824860', // Fairview Rd & Cameron Valley Pkwy Station
				'35.157318,-80.822286', // Sharon Rd at Sharon Twp Ln
				'35.157028,-80.823489', // Sharon Twp Ln at Sharon Rd
				'35.146102,-80.832025', // Ashley Park Ln Station
				'35.153687,-80.839612', // Piedmont Row Dr Station
				'35.156086,-80.835602', // Morrison Blvd at Barclay Downs Dr Station
				'35.157996,-80.833929', // Coca-Cola Plaza Station
				'35.150943,-80.837388', // Barclay Downs Dr Station
				'35.149473,-80.833720', // Nordstrom Station
				'35.148464,-80.830877', // Sharon Rd & Fairview Rd
				'35.151048,-80.824778', // Cameron Valley Pkwy & Morrison Blvd Station
				'35.154916,-80.824521', // Sharon Rd & Colony Rd
				'35.152734,-80.826856', // Sharon Rd & Morrison Blvd
				'35.154681,-80.830536', // Morrison Blvd & Roxborough Rd Station
				'35.157211,-80.828697', // Rexford Rd & Roxborough Rd Station
				'35.145614,-80.825981', // Cameron Valley Pkwy at Phillips Place Station
			],
		],

		visible: [[
			'35.152121,-80.844360', // Fairview Rd & Closeburn Rd
			'35.146754,-80.819224', // Colony Rd & Fairview Rd
		]],

		// Encoded Polyline Algorith Format: https://developers.google.com/maps/documentation/utilities/polylinealgorithm
		path: [
			[ // South Line
				'color:0xffa500b0',
				'35.149894,-80.842229', // Park South Dr Station, east
				'35.151541,-80.841441', // Fairview Rd east of Park S Dr
				'35.151212,-80.839982', // Fairview Rd & Piedmont Row Dr
				'35.151161,-80.838772', // Fairview Rd & Assembly St
				'35.150943,-80.837388', // Barclay Downs Dr
				'35.149473,-80.833720', // Nordstrom
				'35.148785,-80.832087', // Fairview Rd west of Sharon Rd
				'35.148464,-80.830877', // Sharon Rd & Fairview Rd
				'35.146664,-80.824860', // Fairview Rd and Cameron Valley Pkwy
			],
			[ // West Line
				'color:0x00A1DEb0',
				'35.149984,-80.842418', // Park South Dr Station
				'35.151598,-80.841656', // Park S Dr & Fairview Rd
				'35.152762,-80.840867', // Park S Dr bend
				'35.153427,-80.840734', // Park S Dr bend
				'35.153721,-80.840423', // Park S Dr & Carnegie Blvd
				'35.153685,-80.839838', // Piedmont Row Dr & Carnegie Blvd
				'35.153687,-80.839612', // Piedmont Row Dr Station
				'35.153729,-80.837488', // Carnegie Blvd S and Congress St
				'35.153738,-80.836077', // Carnegie Blvd S and Barclay Downs Dr

				'35.155505,-80.836083', // Barclay Downs Dr & Morrison Blvd Station
				'35.156033,-80.836262', // Barclay Downs Dr & Morrison Blvd intersection
				'35.156408,-80.835149', // Morrison Blvd west of Coca-Cola Plaza
				'35.156500,-80.834301', // Morrison Blvd & Coca-Cola Plaza
				'35.157996,-80.833929', // Coca-Cola Plaza Station
				'35.158359,-80.833858', // Coca-Cola Plaza & Rexford Rd
				'35.157865,-80.830914', // Rexford Rd
				'35.157415,-80.829787', // Rexford Rd & Trianon Condo Dr
				'35.156952,-80.829221', // Rexford Rd & Roxborough Rd
				'35.157211,-80.828697', // Rexford Rd & Roxborough Rd Station
				'35.157677,-80.827035', // Sharon Twp Ln at Colony Rd
				'35.157865,-80.824759', // Sharon Twp Ln bend
				'35.157028,-80.823489', // Sharon Twp Ln at Sharon Rd Station
			],
			[ // Sharon Rd Line
				'color:0x9364CCb0',
				'35.157318,-80.822286', // Sharon Rd at Sharon Twp Ln
				'35.154916,-80.824521', // Sharon Rd & Colony Rd
				'35.153694,-80.825740', // Sharon Rd north of Southwick Dr
				'35.152734,-80.826856', // Sharon Rd & Morrison Blvd
				'35.150873,-80.829067', // Sharon Rd at SouthPark Mall
				'35.149962,-80.829887', // Sharon Rd north of Coltsgate Rd
				'35.148464,-80.830877', // Sharon Rd & Fairview Rd
				'35.146102,-80.832025', // Ashley Park Ln Station
			],
			[ // Morrison Blvd Line
				'color:0x008800b0',
				'35.156086,-80.835702', // Morrison Blvd at Barclay Downs Dr Station
				'35.156316,-80.834960', // Morrison Blvd west of Coca-Cola Plaza
				'35.156295,-80.833826', // Morrison Blvd east of Coca-Cola Plaza
				'35.154681,-80.830536', // Morrison Blvd & Roxborough Rd
				'35.153036,-80.827298', // Morrison Blvd west of Sharon Rd
				'35.152734,-80.826856', // Sharon Rd & Morrison Blvd
				'35.151731,-80.825847', // Morrison Blvd at Harris Teeter
				'35.151048,-80.824778', // Cameron Valley Pkwy & Morrison Blvd Station
				'35.150852,-80.824087', // Cameron Valley Pkwy & Morrison Blvd
				'35.149689,-80.824026', // Cameron Valley Pkwy bend
				'35.148456,-80.824700', // Cameron Valley Pkwy south of Coltsgate Rd
				'35.145614,-80.825981', // Cameron Valley Pkwy at Phillips Place Station
			],
		],
	}

})
