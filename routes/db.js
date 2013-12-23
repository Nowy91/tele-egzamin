/*
 * Available only in NODE_ENV = 'development' 
 */

var sequelize = require('./../models/index').sequelize;
var models = require('./../models');
var crypto = require('crypto');
var User = models.User;
var Admin = models.Admin;

exports.init = function (req, res) {
    sequelize.sync().success(function () {

        User.find({where: {username: 'admin'}}).success(function (user) {

            if (user == null) {
                User.create({
                    username: 'admin',
                    password: crypto.createHash('sha1').update('admin').digest('hex'),
                    email: 'admin@admin.pl',
                    role: 'admin'
                }).success(function (u) {
                    Admin.create().success(function (admin) {
                        admin.setUser(u);
                    });
                });
            }
        });
    });

    res.render('db', { title: 'Database has been synchronized'});
};