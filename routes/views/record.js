var keystone = require('keystone');

exports	=	module.exports	=	function(req,res){
	view = new keystone.View(req,res);
	view.render('record');
};