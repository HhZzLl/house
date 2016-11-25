var keystone = require('keystone');
var     cmds = keystone.List('cmds',{
			map:{name: 'title'}
		});
var    Types = keystone.Field.Types;
     cmds.add({
	  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
     outstring: { type: String},
         a1: { type: String},
		 a2: { type: String}
});
 
    cmds.register();
 