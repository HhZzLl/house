var keystone = require('keystone');
var Types = keystone.Field.Types;

var Node = new keystone.List('Node',{
	autokey:{ from: 'name', path: 'slug', unique: true }
});

Node.add({
	name: { type: String},
	publishedDate: { type: Types.Datetime},
	content: {
		brief: { type: Types.Textarea, wysiwyg: true, height: 150 },
		extended: { type: Types.Textarea, wysiwyg: true, height: 400 }
	}
});

Node.register();