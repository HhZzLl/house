var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	//isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
	 canAccessKeystone: { type: Boolean, initial: true }

});

// Provide access to Keystone
//User.schema.virtual('canAccessKeystone').get(function() {
	//return this.isAdmin;
	//return true;
//});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });




/**
 * Registration
 */
User.track = true;
User.defaultColumns = 'name, email, isAdmin';
User.register();
