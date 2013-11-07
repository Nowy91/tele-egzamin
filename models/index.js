var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize('da7upvs3dcm7o2', 'jibfnvnksgmrch', 'jww7Zr2WLpZpOJM_0g4Z_WfZUh', {
	host: 'ec2-54-247-178-60.eu-west-1.compute.amazonaws.com',
	port: 5432,
  	dialect: 'postgres'
});


// load models
var models = [
	'User',
  	'Admin',
  	'Examiner',
  	'Exam',
  	'Token',
  	'Grade',
  	'Question',
  	'Answer',
  	'OpenedAnswer',
  	'ClosedAnswer'
];

models.forEach(function(model) {
 	module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  	m.Admin
  		.belongsTo(m.User, { foreignKey : 'userId' });
  	m.Examiner
  		.belongsTo(m.User, { foreignKey : 'userId' })
  		.hasMany(m.Exam, { foreignKey : 'examinerId' });
  	m.Exam
  		.hasMany(m.Token, { foreignKey : 'examId' })
  		.hasMany(m.Question, { foreignKey : 'examId' })
  		.hasOne(m.Grade, { foreignKey : 'examId' });
	m.Question
		.hasMany(m.Answer, { foreignKey : 'questionId' })
		.hasOne(m.OpenedAnswer, { foreignKey : 'answerId' })
		.hasMany(m.ClosedAnswer, { foreignKey : 'answerId' });
})(module.exports);

// export connection
module.exports.sequelize = sequelize;