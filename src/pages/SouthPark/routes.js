'use strict';

angular.module('pageSouthPark')
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/SouthPark', {
		templateUrl: 'pages/SouthPark/SouthPark.html',
		controller: 'ctrlSouthPark',
		controllerAs: '$ctrl',
	})
}])
.controller('ctrlSouthPark', ['$scope', '$interpolate', ($s, $i) => {
	angular.element('[ng-view]').addClass('no-pad')
	// Display Settings
	$s.distance = {
		wSouthpark: 400,
		sSouthpark: 400,
		parkRd: 500,
		uptown: 330,
	}
	$s.angle = {
		wSouthpark: 55,
		sSouthpark: 70,
		parkRd: 60,
		uptown: 70,
	}
	// Calculate Placement of Blue Line
	$s.blue = {
		distance: $s.distance.uptown * 4,
		start: [0],
	}
	$s.blue.start.push(
		Math.cos(Math.PI / 180 * $s.angle.uptown) * $s.blue.distance
	)
	$s.blue.mid = [
		$s.blue.start[0] + Math.sin(Math.PI / 180 * $s.angle.uptown) * $s.blue.distance / 2,
		$s.blue.start[1] - Math.cos(Math.PI / 180 * $s.angle.uptown) * $s.blue.distance / 2,
	]
	$s.blue.end = [
		$s.blue.start[0] + Math.sin(Math.PI / 180 * $s.angle.uptown) * ($s.blue.distance + 20),
		$s.blue.start[1] - Math.cos(Math.PI / 180 * $s.angle.uptown) * ($s.blue.distance + 20),
	]
	// Calculate Grid Points
	for (let k in $s.distance) {
		$s.distance[k] = {
			x: Math.sin(Math.PI / 180 * $s.angle[k]) * $s.distance[k],
			y: Math.cos(Math.PI / 180 * $s.angle[k]) * $s.distance[k],
		}
		$s.distance[k].unit = Math.sqrt($s.distance[k].x * $s.distance[k].x + $s.distance[k].y * $s.distance[k].y)
	}
	// Calculate Points on East Line
	$s.distance.eSouthpark = {
		start: {
			x: $s.distance.sSouthpark.x * 3,
			y: $s.distance.sSouthpark.y * 3,
		},
		end: {
			x: $s.distance.wSouthpark.x * 3 + $s.distance.wSouthpark.unit * 2 - $s.distance.sSouthpark.x * 3,
			y: $s.distance.wSouthpark.y * 3 + $s.distance.sSouthpark.y * 3,
		},
	}
	// Calculate Midpoint on Morrison Blvd Line
	$s.distance.mSouthpark = {
		midpoint: {
			x: ($s.distance.eSouthpark.start.x + $s.distance.wSouthpark.x * 2) / 2,
			y: ($s.distance.eSouthpark.start.y - $s.distance.eSouthpark.end.y / 3 - $s.distance.wSouthpark.y * 2) / 2,
		},
		corner: {
			x: $s.distance.eSouthpark.start.x - $s.distance.wSouthpark.x * 2,
			y: $s.distance.eSouthpark.start.y - $s.distance.eSouthpark.end.y / 3 + $s.distance.wSouthpark.y * 2,
		},
	}

	$(() => {
		// Give each route an outline
		$('path.route').each(function() {
			let $this = $(this)
			if (!$this.is('.overlay')) {
				$this.clone().removeClass('route').addClass('outline').prependTo($this.parent())
			}
		})
	})
}])
