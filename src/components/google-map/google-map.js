'use strict';

angular.module('compGoogleMap')
.component('googleMap', {
	templateUrl: 'components/google-map/google-map.html',
	controller: 'ctrlGoogleMap',
	controllerAs: '$ctrl',
	bindings: {
		features: '<',
	},
})
.controller('ctrlGoogleMap', function() {
	this.alt = 'Google Map'
	this.$onInit = () => {
		let opts = {
			key: 'AIzaSyBnow4ZVuX0dXXj8c0o_OinH0SBZbujPqg',
			center: 'SouthPark, Charlotte NC',
			maptype: 'hybrid',
			size: '600x500',
		}

		// Compile URL
		for (let p in this.features) {
			if (!opts[p]) opts[p] = []
			this.features[p].forEach((m) => {
				opts[p].push(m.join('|'))
			})
			if (opts[p].length) {
				delete opts.center
			}
		}
		let params = []
		for (let i in opts) {
			if (Array.isArray(opts[i])) {
				if (opts[i].length) {
					opts[i].forEach((o) => {
						params.push(`${i}=${encodeURIComponent(o)}`)
					})
				}
			} else {
				params.push(`${i}=${encodeURIComponent(opts[i])}`)
			}
		}
		this.url = 'https://maps.googleapis.com/maps/api/staticmap?' + params.join('&')
	}
})
