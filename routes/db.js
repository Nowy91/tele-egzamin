/*
 * Available only in NODE_ENV = 'development' 
 */

var sequelize = require('./../models/index').sequelize;

exports.init = function(req, res) {
	sequelize.sync();
	res.render('db', { title: 'Database has been synchronized'});
};