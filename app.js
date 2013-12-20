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
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var models = require('./models');
var Exam = models.Exam;
var User = models.User;

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
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.find(id).success(function (user) {
        done(null, user);
    });
});

passport.use(new LocalStrategy(
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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.get('/initdb', db.init);
}

//main
app.get('/', routes.index);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.json({status: 'unathorized'});
    }
}

//exams
app.get('/exams', ensureAuthenticated, exam.list);
app.get('/exam/view/:id', exam.view);
app.get('/exam/view/:id/questions', question.list);
app.post('/exam/add', exam.add);
app.post('/exam/edit/:id', exam.edit);
app.delete('/exam/delete/:id', exam.delete);
app.post('/exam/activate/:id', exam.activate);

//questions
app.get('/questions/view/:id', question.view);
app.get('/questions/view/:id/answers', question.getAnswers);
app.post('/questions/add', question.add);
app.post('/questions/answers/add/:id', question.addAnswers);
app.post('/questions/file/add', question.addFile);
app.delete('/questions/delete/:id', question.delete);
app.post('/questions/edit/:id', question.edit);
app.post('/questions/answers/edit/:id', question.editAnswers);

//examiners
app.get('/examiners', ensureAuthenticated, examiner.list);
app.post('/examiner/add', examiner.add);
app.get('/examiner/view/:id', examiner.view);
app.delete('/examiner/delete/:id', examiner.delete);
app.post('/examiner/edit/:id', examiner.edit);

//tokens
app.get('/tokens/:examId/:status', token.list);
app.post('/tokens/generate/', token.generate);
app.get('/check/:token/:examId', check.getData);
app.post('/check/:token/checked', check.checked);

//student
app.get('/student/check/:token', student.check);
app.get('/student/get/:examId', student.getQuestions);
app.post('/student/answers/:token', student.saveAnswers);
app.post('/student/images/:token', student.saveImageAnswers);

//auth
app.post('/login', auth.login);

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