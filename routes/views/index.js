var keystone = require('keystone');
var exec = require('child_process').exec;
var cmds = keystone.list('cmds');
exports = module.exports = function(req, res,Cmd) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.section = 'home';
	 
	view.on('post',function(next){ 
	    var p1 = req.body.p1;
	    var p2 =req.body.p2;
		
		//执行命令并存到数据库里
        exec("ls -"+p1+p2, function(error,stdout,stderr){
			
			var newcmds = new cmds.model({
				  title: 'ps ',
				  outstring: stdout,
				  a1: p1,
				  a2: p2
		    });
			newcmds.save(function(){
					//从数据库里取数据
				keystone.list('cmds').model.findOne().sort('-createdAt').exec(function(err,result){
					 if (err) return console.err(err);
					 console.log(result);
					 locals.data = result;	
					 next();		
				});
				
				
			});	
		});
		
		
	
	});
	
	
	// Render the view
    view.render('cmd');
		
};


	
	