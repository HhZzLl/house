var keystone = require('keystone');
var node = keystone.list('Node');

exports = module.exports = function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	
	locals.data = {
		node: []
	};
	
	view.on('init',function(next){
		keystone.list('Node').model.find().sort('publishedDate').exec(function(err,result){
			locals.data.node = result ;
			next();
		})
	})
	view.render('jade');
};