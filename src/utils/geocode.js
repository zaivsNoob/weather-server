/** @format */
const request = require('request')

const geoCode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoiemFpdnMiLCJhIjoiY2tic2NtN3U2MDA5ZDJucWU1MTI2ZTVnZyJ9.aW5s79HD9QUnUrVJdOWbfQ&limit=1'

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('unable to connect to internet', undefined)
		} else if (response.body.features.length === 0) {
			callback('try another search', undefined)
		} else {
			callback(undefined, {
				latitude: response.body.features[0].center[1],
				longtitude: response.body.features[0].center[0],
				location: response.body.features[0].place_name,
			})
		}
	})
}
module.exports = geoCode
