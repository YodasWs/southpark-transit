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
				'35.170430,-80.807229', // Orient Rd & Providence Rd
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
				'35.210629,-80.827172', // 3rd St after Queens Rd
				'35.207988,-80.824430', // Providence Rd before S Colonial Ave
				'35.205497,-80.824167', // Providence Rd and Alberto St
				'35.202360,-80.824920', // Providence Rd after Cherokee Rd
				'35.198687,-80.826056', // Providence Rd at Cottage Pl
				'35.195220,-80.826632', // Providence Rd after Queens Rd
			],
		],
	}

	// Calculations found in http://www.geomidpoint.com/destination/calculation.html

	const f = 1 / 298.257223563 // WGS-84 inverse flattening
	const a = 6378137 // Semi-major axis
	const b = 6356752.314245 // Semi-minor axis
	const qm = 402.33600 // Quarter-mile in meters

	this.mapFeatures.markers.forEach((l) => {
		let circle = ['color:0x00000000','fillcolor:0xffa50030']
		l.forEach((m) => {
			if (m.indexOf(',') === -1) return
			// Path of circle
			// Convert each lat/lon to radians
			m = m.split(',').map((n) => {
				return Number.parseFloat(n) * Math.PI / 180
			})

			// Base calculations
			const tu1 = (1 - f) * Math.tan(m[0])
			const cu1 = 1 / Math.sqrt((1 + tu1 * tu1))
			const su1 = tu1 * cu1

			// Calculate points around circle
			const numPoints = 18
			for (let i=0; i<=numPoints; i++) {
				const brg = 360 / numPoints * i * Math.PI / 180

				// Start calculations
				const sb = Math.sin(brg)
				const cb = Math.cos(brg)
				const s2 = Math.atan2(tu1, cb)
				const sa = cu1 * sb
				const csa = 1 - sa * sa
				const us = csa * (a * a - b * b) / (b * b)
				const A = 1 + us / 16384 * (4096 + us * (-768 + us * (320 - 175 * us)))
				const B = us / 1024 * (256 + us * (-128 + us * (74 - 47 * us)))
				let s1 = qm / (b * A)
				let s1p = 2 * Math.PI
				let cs1, cs1m, ss1

				do {
					cs1m = Math.cos(2 * s2 + s1)
					ss1 = Math.sin(s1)
					cs1 = Math.cos(s1)
					const ds1 = B * ss1 * (cs1m + B / 4 * (cs1 * (-1 + 2 * cs1m * cs1m) - B / 6 * cs1m * (-3 + 4 * ss1 * ss1) * (-3 + 4 * cs1m * cs1m)))
					s1p = s1
					s1 = qm / (b * A) + ds1
				} while (Math.abs(s1 - s1p) > 1e-12)

				const t = su1 * ss1 - cu1 * cs1 * cb
				let lat2 = Math.atan2(su1 * cs1 + cu1 * ss1 * cb, (1 - f) * Math.sqrt(sa * sa + t * t))
				const l2 = Math.atan2(ss1 * sb, cu1 * cs1 - su1 * ss1 * cb)
				const c = f / 16 * csa * (4 + f * (4 - 3 * csa))
				const l = l2 - (1 - c) * f * sa * (s1 + c * ss1 * (cs1m + c * cs1 * (2 * cs1m * cs1m - 1)))
				let lon2 = m[1] + l

				lat2 *= 180 / Math.PI
				lon2 *= 180 / Math.PI

				while (lon2 < -180) {
					lon2 += 360
				}
				while (lon2 > 180) {
					lon2 -= 360
				}

				circle.push(lat2 + ',' + lon2)

			}
		})
		this.mapFeatures.path.push(circle)
	})

})
