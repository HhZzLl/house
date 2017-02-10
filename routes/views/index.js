var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/',routes.views.home);
	app.get('/cmd',routes.views.index);
	app.post('/cmd',routes.views.index);
	app.get('/d3',routes.views.dataView);
	app.get('/eCategory',routes.views.eCategory);
	app.get('/eCategory/:equipment?',routes.views.eCategory);
	app.get('/eCategory/equipment/:equipment',routes.views.equipment);
	app.get('/lRecord',routes.views.record);
	app.get('/plain',routes.views.plain);
	app.get('/node',routes.views.node);
	app.get('/git',routes.views.git);
	app.get('/D3',routes.views.d3);
	app.get('/mongo',routes.views.mongo);
	app.get('/JS',routes.views.JS);
};
