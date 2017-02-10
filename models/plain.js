var keystone = require('keystone');
var	Types = keystone.Field.Types;

var Plain = new keystone.List('Plain',{
	autokey:{ from: 'name', path: 'slug', unique: true}
});
Plain.add({
	name: { type: String },
	content: { type: String },
	result: { type: String },
	fcase: { type: String },
	noReason: { type: String },
	measure: { type: String },
	time: { type: Types.Date }
});

Plain.register();