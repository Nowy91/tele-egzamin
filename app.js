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

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.get('/initdb', db.init);
}

app.get('/', routes.index);
app.get('/exams', exam.list);

app.get('/exam/view/:id/questions', question.list);
app.get('/questions/view/:id', question.view);
app.post('/questions/add', question.add);
app.delete('/questions/delete/:id', question.delete);
app.post('/questions/edit/:id', question.edit);

app.post('/exam/add', exam.add);
app.get('/exam/view/:id', exam.view);
app.delete('/exam/delete/:id', exam.delete);

app.get('/examiners',examiner.list);


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
