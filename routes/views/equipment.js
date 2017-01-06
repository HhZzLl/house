//每个固定资产的单独页面

var keystone = require('keystone');
async = require('async');

exports = module.exports = function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	
	locals.filters = {
		equipment: req.params.equipment
	};
	locals.data = {
		equipments: []
	};
	
	//加载固定资产的详细信息
	view.on('init',function(next){
		keystone.list('Equipment').model.findOne({
			slug:locals.filters.equipment
		}).exec(function(err,result){
			locals.data.equipment = result;
			next(err);
		});
	});
	
	view.on('init',function(next){
		keystone.list('Equipment').model.find().exec(function(err,result){
			locals.data.equipments = result;
			next(err);
		});
	});
	
	view.render('equipment');
};