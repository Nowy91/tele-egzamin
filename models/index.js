var sequelize = require('./dbconnection').sequelize;

// load models
var models = [
	'User',
  	'Admin',
  	'Examiner',
  	'Exam',
  	'Token',
  	'Grade',
  	'Question',
    'QuestionAnswer',
  	'Answer'
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
    m.Token
        .hasOne(m.Grade, { foreignKey : 'tokenId' })
        .hasMany(m.Answer, { foreignKey : 'tokenId' });
	m.Question
		.hasMany(m.QuestionAnswer, { foreignKey : 'questionId' })
        .hasMany(m.Answer, { foreignKey : 'questionId' });

})(module.exports);

// export connection
module.exports.sequelize = sequelize;