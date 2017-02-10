var keystone = require('keystone');
var plain = keystone.list('Plain');

exports = module.exports = function(req,res){
	
	var view = new keystone.View(req,res);
	var locals = res.locals;
	
	locals.data = {
		plain:[]
	};
	view.on('init',function(next){
		
		keystone.list('Plain').model.find().sort('-time').exec(function(err,result){
				locals.data.plain = result;
				console.log(locals.data.plain);
				next();
			});
		});
	view.render('plain');
};