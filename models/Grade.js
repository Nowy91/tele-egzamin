var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('grade', {
		id : {
			type : Sequelize.BIGINT,
			primaryKey : true
		},		
		mark : {
			type : Sequelize.DECIMAL(2, 1)
		},
		reachedPoints : {
			type : Sequelize.DECIMAL(6, 3)
		},
		maxPoints : {
			type : Sequelize.DECIMAL(6, 3)
		}
	});
}; 