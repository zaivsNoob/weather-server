/** @format */

const request = require('request')
const forCast = (latitude, longtitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=6a32b56bba9bf70eafae175249b24f3b&query=' +
		latitude +
		',' +
		longtitude
	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('unable to connect', undefined)
		} else if (response.body.error) {
			callback('unable to find location', undefined)
		} else {
			callback(
				undefined,
				response.body.current.temperature + 
				' degrees out and feels like  ' + 
				response.body.current.feelslike+
				", observed at : "+response.body.location.localtime
			)
		}
	})
}

module.exports = forCast
