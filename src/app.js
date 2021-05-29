/** @format */
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forCast = require('./utils/forecast')

const request = require('request')

//directory configs
const pathDirectory = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../public/templates/views')
const partialpath = path.join(__dirname, '../public/templates/partials')
const app = express()
//handbars config
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

//static page directory setup
app.use(express.static(pathDirectory))

app.get('', (req, res) => {
	res.render('index', { title: 'Weather', name: 'indexFooter' })
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'footerAbout',
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'enter and address please',
		})
	}
	geoCode(req.query.address, (error, data) => {
		if (error) {
			return res.send({
				error,
			})
		}
		forCast(data.latitude, data.longtitude, (error, data) => {
			if (error) {
				return res.send({
					error,
				})
			}
			res.send({
				data,

				address: req.query.address,
			})
		})
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'helpFooter',
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'No article',
		errorMessage: 'Article not found',
		name: 'Ja mone hoy ta',
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMessage: 'Page not found',
		name: 'Ja mone hoy ta',
	})
})

app.listen(3000, () => {
	console.log('server runnning on port 3000')
})
