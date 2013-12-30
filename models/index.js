var Sequelize = require('sequelize');

// initialize database connection
var sequelize = new Sequelize('d5adfko5qnhupc', 'norkjiplytdgpw', '1N6gHWQOwXzIGTaI3NscWoOiYA', {
    host: 'ec2-54-217-239-27.eu-west-1.compute.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    omitNull: true
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
  		.hasMany(m.Question, { foreignKey : 'examId'})
        .hasMany(m.Grade, { foreignKey : 'examId'});
	m.Question
		.hasMany(m.QuestionAnswer, { foreignKey : 'questionId', onDelete: 'cascade'})
        .hasMany(m.Answer, { foreignKey : 'questionId' });
    m.Token
        .hasMany(m.Answer, { foreignKey: 'token'})

})(module.exports);

// export connection
module.exports.sequelize = sequelize;