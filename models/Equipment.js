var keystone = require('keystone');
var Types = keystone.Field.Types;

var Equipment = new keystone.List('Equipment',{
	autokey:{ from: 'name', path: 'slug', unique: true}
});

Equipment.add({
	name: { type: String, required: true },
	purchaseDate: { type: Types.Date },
	amount: { type: Types.Number },
	originValue: { type: Types.Money },
	serverLife: { type: Types.Number },
	remainRatio: { type: String },
	annualDepreciation: { type: Types.Money },
	monthDepreciation: { type: Types.Money },
	monthDepreciationRatio: { type: String },
	accumulatedDepreciation: { type: Types.Money },
	netValue: { type: Types.Money },
	depreciationMonth: { type: Types.Number},
	categories: { type: Types.Relationship, ref: 'EquipmentCategory', many: true }
});

Equipment.register();


