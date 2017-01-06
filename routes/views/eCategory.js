var keystone = require('keystone');
async = require('async');
var ECategory = keystone.list('EquipmentCategory');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.filters = {
		equipment: req.params.equipment
	};
	
	locals.data = { 
		equipments: [],
		ecategories: [] 
	};
	//加载所有的固定资产分类
	view.on('init',function(next){
		ECategory.model.find().sort('name').exec(function(err,results){
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.ecategories = results;
			//计算每个类中固定资产的个数
			async.each(locals.data.ecategories,function(category,next){
				keystone.list('Equipment').model.count().where('categories').in([category.id]).exec(function(err,count){
					category.postCount = count;
					next(err);
				});
			},function(err){
					next(err);
				});
			});
		});
	//加载当前类
	view.on('init',function(next){
		
		if(req.params.equipment){
			ECategory.model.findOne({ key: locals.filters.equipment }).exec(function(err,result){
				locals.data.category = result;
				locals.data.category.active = true;
				next(err);
			});
		}else{ 
			next();
		}
	});
	//分页加载前类的固定资产
	view.on('init',function(next){
		
		var e = keystone.list('Equipment').paginate({
			page: req.query.page || 1,
			perpage: 10,
			maxpages: 10
		});
		
		if(locals.data.category){
			e.where('categories').in([locals.data.category]);
		}
		
		e.exec(function(err,results){
			locals.data.equipments = results;
			next(err);
		});
	});
	//第一次加载没有分类的全部固定资产
	view.on('init',function(next){
		var ep = keystone.list('Equipment').model.findOne();
		ep.exec(function(err,result){
			locals.data.equipment = result;
			next(err);
		});
	});
		view.render('eCategory',locals);
	};
	
