var passport = require('passport');

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
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
            return res.json({'status': 'ok', session: req.session});
        });
    })(req, res, next)
};

exports.logout = function (req, res, next) {
    req.logout();
    delete req.session.passport.username;
    res.end();
};

exports.isAuthenticated = function(req, res) {
    res.send(req.session);
};