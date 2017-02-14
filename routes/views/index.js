var keystone = require('keystone');
var exec = require('child_process').exec;
var Cmd = keystone.list('cmds');

exports = module.exports = function(req,res){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	
	locals.data = {};
	
	view.on('post',function(next){
		
		
			title =  req.params.p3,
			a1 =  req.params.p1,
			a2 =  req.params.p2
			console.log(a1+a2);
		
		exec("title "+a1+a2,function(error,stdout,stderr){
			locals.data = stdout;
			console.log(locals.data);
			next();
		});
	})
	view.render('cmd');
};