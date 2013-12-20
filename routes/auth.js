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
            return res.json({'status': 'ok', session: req.session});
        });
    })(req, res, next)
}