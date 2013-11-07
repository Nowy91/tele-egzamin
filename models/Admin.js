var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('admin', {
		id : {
			type : Sequelize.BIGINT,
			primaryKey : true
		}
	});
}; 