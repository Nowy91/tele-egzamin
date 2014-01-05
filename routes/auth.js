var passport = require('passport');

exports.login = function (req, res, next) {
    passport.authenticate('local_examiner', function (err, user, info) {
        if (err) {
            return res.send({'status': 'err', 'message': err.message});
        }

        if (!user) {
            return res.send({'status': 'fail', 'message': info.message});
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.send({'status': 'err', 'message': err.message});
            }

            req.session.passport.username = user.username;

            return res.json({'status': 'ok', role: user.role, session: req.session});
        });
    })(req, res, next);
};

exports.login2 = function(req, res, next) {
    req.body.password = 'x';

    passport.authenticate('local_student', function (err, token, info) {
        if (err) {
            return res.send({'status': 'err', 'message': err.message});
        }

        if (!token) {
            return res.send({'status': 'fail', 'message': info.message});
        }

        req.logIn(token, function (err) {
            if (err) {
                return res.send({'status': 'err', 'message': err.message});
            }

            req.session.passport.token = token.content;
            return res.json({'status': 'ok', session: req.session});
        });
    })(req, res, next);
};

exports.logout = function (req, res, next) {
    req.logout();
    delete req.session.passport.username;
    delete req.session.passport.token;
    res.end();
};

exports.isAuthenticated = function(req, res) {
    res.send(req.session);
};