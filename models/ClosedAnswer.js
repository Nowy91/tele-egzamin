var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('closed_answer', {
		id : {
			type : Sequelize.BIGINT,
			primaryKey : true
		},		
		content : {
			type : Sequelize.STRING
		}
	});
}; 