// Simulate config options from your production environment by
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
keystone.init({
	'name': 'My Site',
	'brand': 'My Site',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'handlebars',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		defaultLayout: 'main',
	    extname: '.handlebars'
	}).engine,
	
	'emails': 'templates/emails',
	'auto update': true,
	'mongo': process.env.MONGO_URI||'mongodb://192.168.1.97/yao_test',
	'session': true,
	'auth': true,
	'user model': 'User',	
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts.
keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.
keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();