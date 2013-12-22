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

function authorization(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.json({status: 'unathorized'});
    }
}

//exams
app.get('/exams', authorization, exam.list);
app.get('/exam/view/:id', authorization, exam.view);
app.get('/exam/view/:id/questions', authorization, question.list);
app.post('/exam/add', authorization, exam.add);
app.post('/exam/edit/:id', authorization, exam.edit);
app.delete('/exam/delete/:id', authorization, exam.delete);
app.post('/exam/activate/:id', authorization, exam.activate);

//questions
app.get('/questions/view/:id', authorization, question.view);
app.get('/questions/view/:id/answers', authorization, question.getAnswers);
app.post('/questions/add', authorization, question.add);
app.post('/questions/answers/add/:id', authorization, question.addAnswers);
app.post('/questions/file/add', authorization, question.addFile);
app.delete('/questions/delete/:id', authorization, question.delete);
app.post('/questions/edit/:id', authorization, question.edit);
app.post('/questions/answers/edit/:id', authorization, question.editAnswers);

//examiners
app.get('/examiners', authorization, examiner.list);
app.post('/examiner/add', authorization, examiner.add);
app.get('/examiner/view/:id', authorization, examiner.view);
app.delete('/examiner/delete/:id', authorization, examiner.delete);
app.post('/examiner/edit/:id', authorization, examiner.edit);

//tokens
app.get('/tokens/:examId/:status', authorization, token.list);
app.post('/tokens/generate/', authorization, token.generate);
app.get('/check/:token/:examId', authorization, check.getData);
app.post('/check/:token/checked', authorization, check.checked);

//student
app.get('/student/check/:token', authorization, student.check);
app.get('/student/get/:examId', authorization, student.getQuestions);
app.post('/student/answers/:token', authorization, student.saveAnswers);
app.post('/student/images/:token', authorization, student.saveImageAnswers);

//auth
app.post('/login', auth.login);
app.get('/logout', auth.logout);

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