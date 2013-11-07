var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	
	return sequelize.define('exam', {
		id : {
			type : Sequelize.BIGINT,
			primaryKey : true
		},		
		title : {
			type : Sequelize.STRING(50)
		},
		date : {
			type : Sequelize.DATE
		},
		duration : {
			type : Sequelize.INTEGER
		},
		numberOfStudents : {
			type : Sequelize.INTEGER
		},
		status : {
			type : Sequelize.STRING(20)
		}
	});
}; 