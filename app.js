/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var db = require('./routes/db');
var exam = require('./routes/exam');
var question = require('./routes/question');
var examiner = require('./routes/examiner');
var token = require('./routes/token');
var student = require('./routes/student');
var check = require('./routes/check');
var crypto = require('crypto');
var auth = require('./routes/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var models = require('./models');
var Exam = models.Exam;
var User = models.User;
var Token = models.Token;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'my secret'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.find(id).success(function (user) {
        if (user == null) {
            Token.find(id).success(function(token) {
                done(null, token);
            });
        }
        else {
            done(null, user);
        }
    });
});

// Uwierzytelnienie dla egzaminatora lub administratora
passport.use('local_examiner', new LocalStrategy(
    function (username, password, done) {
        encryptedPassword = crypto.createHash('sha1').update(password).digest('hex');

        User.find({where: {username: username}}).success(function (user) {
            if (!user) {
                return done(null, false, { message: 'Nieprawidłowy login!' });
            }
            if (user.password !== encryptedPassword) {
                return done(null, false, { message: 'Nieprawidłowe hasło!' });
            }
            return done(null, user);
        });

    }
));

// Uwierzytelnienie dla studenta
passport.use('local_student', new LocalStrategy({
        usernameField: 'content'
    },
    function (content, password, done) {
        Token.find({where: {content: content}}).success(function (token) {
            if (!token) {
                return done(null, false, { message: 'Nieprawidłowy token!' });
            }
            return done(null, token);
        })
    }
));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.get('/initdb', db.init);
}

//main
app.get('/', routes.index);

function allow(roles) {
    return function (req, res, next) {
        if (req.user !== undefined) {
            if (roles.indexOf('*') > -1 && req.isAuthenticated()) {
                return next();
            }

            if (roles.indexOf(req.user.role) > -1 && req.isAuthenticated()) {
                return next();
            }
        }

        return res.json({status: 'unathorized'});
    }
}

//exams
app.get('/exams', allow(['*']), exam.list);
app.get('/exam/view/:id', allow(['*']), exam.view);
app.get('/exam/view/:id/questions', allow(['*']), question.list);
app.get('/exam/view/:id/grades', allow(['*']), exam.getGrades);
app.post('/exam/add', allow(['*']), exam.add);
app.post('/exam/edit/:id', allow(['*']), exam.edit);
app.delete('/exam/delete/:id', allow(['*']), exam.delete);
app.post('/exam/activate/:id', allow(['*']), exam.activate);

//questions
app.get('/questions/view/:id', allow(['*']), question.view);
app.get('/questions/view/:id/answers', allow(['*']), question.getAnswers);
app.post('/questions/add', allow(['*']), question.add);
app.post('/questions/answers/add/:id', allow(['*']), question.addAnswers);
app.post('/questions/file/add', allow(['*']), question.addFile);
app.delete('/questions/delete/:id', allow(['*']), question.delete);
app.post('/questions/edit/:id', allow(['*']), question.edit);
app.post('/questions/answers/edit/:id', allow(['*']), question.editAnswers);

//examiners
app.get('/examiners', allow(['admin']), examiner.list);
app.post('/examiner/add', allow(['admin']), examiner.add);
app.get('/examiner/view/:id', allow(['admin']), examiner.view);
app.delete('/examiner/delete/:id', allow(['admin']), examiner.delete);
app.post('/examiner/edit/:id', allow(['admin']), examiner.edit);

//tokens
app.get('/tokens/:examId/:status', allow(['*']), token.list);
app.post('/tokens/generate/', allow(['*']), token.generate);
app.get('/check/:token/:examId', allow(['*']), check.getData);
app.post('/check/:token/checked', allow(['*']), check.checked);

//student
app.get('/student/check/:token', allow(['*']), student.check);
app.get('/student/get/:examId', allow(['*']), student.getQuestions);
app.post('/student/answers/:token', allow(['*']), student.saveAnswers);
app.post('/student/images/:token', allow(['*']), student.saveImageAnswers);

//auth
app.post('/login', auth.login);
app.post('/login2', auth.login2);
app.get('/logout', auth.logout);
app.get('/is_authenticated', auth.isAuthenticated);

var server = http.createServer(app).listen(app.get('port'));
var io = require('socket.io').listen(server);

io.configure(function () {
    io.set("transports", ['xhr-polling']);
    io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
    socket.on('exam activation', function (examId) {
        io.sockets.emit('activated exam', examId);
    });
});