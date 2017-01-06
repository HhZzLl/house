var keystone = require('keystone');
var Types = keystone.Field.Types;

var EquipmentCategory = new keystone.List('EquipmentCategory',{
	autokey:{ from: 'name', path: 'key',unique: true}
});

EquipmentCategory.add({
	name:{ type: String, required: true }
});

EquipmentCategory.relationship({ ref: 'Equipment', path : 'categories' });

EquipmentCategory.register();