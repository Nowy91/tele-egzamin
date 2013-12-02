Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

        var examModel;
        var layout;
        var collection;
        var questionsCollection;

        Controller.Check = {

            showAll: function () {
                examModel = Teleegzam.Controllers.Exam.getModel("examModel");
                layout = Teleegzam.Controllers.Exam.getModel("layout");

                var getTokens = $.ajax({
                    type: 'GET',
                    url: '/tokens/' + examModel.id + "/executed",
                    dataType: 'json'
                });

                $.when(getTokens)
                    .done(function (tokens) {
                        collection = new App.Collections.Tokens(tokens);
                        layout.content.show(new App.Views.ExecutedTokenList({collection: collection, model: examModel}));
                    });
            },

            showToken: function (token) {
                var getData = $.ajax({
                    type: 'GET',
                    url: '/check/' + token + "/" + examModel.id,
                    dataType: 'json'
                });
                $.when(getData)
                    .done(function (data) {
                        var questionsCollection = new App.Collections.Questions(data.questions);
                        var answersCollection = new App.Collections.QuestionAnswers(data.answers);
                        var studentAnswersCollection = new App.Collections.Answers(data.studentAnswers);

                        for (var i = 0; i < questionsCollection.length; i++) {
                            var currentQuestion = questionsCollection.at(i).get('id');
                            var currentAnswer = studentAnswersCollection.where({questionId: parseInt(currentQuestion)});
                            if (currentAnswer[0] != undefined)questionsCollection.at(i).set('studentAnswer', currentAnswer[0].get('content'));
                            else questionsCollection.at(i).set('studentAnswer', "");
                        }

                        examModel.set('token', token);

                        var checkingView = new App.Views.CheckQuestionList({collection: questionsCollection, model: examModel})
                        layout.content.show(checkingView);

                        var closedQuestions = questionsCollection.where({type: 'closed'});
                        //console.log(closedQuestions);

                        for (var i = 0; i < closedQuestions.length; i++) {
                            var currId = closedQuestions[i].get('id');
                            var correctA = answersCollection.where({questionId: parseInt(currId)});
                            var studentA = studentAnswersCollection.where({questionId: parseInt(currId)});

                            if (studentA[0] != undefined) {
                                //alert(i);
                                layout.addRegion('correctAns', '#' + currId + " .leftAnswers");
                                layout.addRegion('studentAns', '#' + currId + " .rightAnswers");
                                //console.log(layout);

                                var correctCollection = new App.Collections.QuestionAnswers(correctA);
                                var score = new App.Models.Answer({score: 10, questionId: currId});
                                layout.correctAns.show(new App.Views.CheckAnswerList({collection: correctCollection, model: score}));

                                var studentCollection = new App.Collections.QuestionAnswers;
                                for (var k = 0; k < correctCollection.length; k++) {
                                    correctCollection.at(k).set({isSet: false});
                                    studentCollection.push(correctCollection.at(k));
                                }

                                var array = studentA[0].get("content");
                                var points = 0, maxPoints = 0, zero = false;
                                for (var j = 0; j < studentCollection.length; j++) {
                                    if (array.indexOf(studentCollection.at(j).get('content')) >= 0)
                                        studentCollection.at(j).set({isSet: true});

                                    var s = studentCollection.at(j).get('isSet');
                                    var c = studentCollection.at(j).get('isCorrect');
                                    if (!zero) {
                                        if (s && c)points++;
                                        else if (s && !c) {
                                            points = 0;
                                            zero = true;
                                        }
                                    }
                                    if (c == true) maxPoints++;

                                }
                                var finalScore = parseFloat(closedQuestions[i].get('maxPoints')) * points / maxPoints;
                                score.set({score: finalScore});
                                layout.studentAns.show(new App.Views.CheckAnswerList({collection: studentCollection, model: score }));

                                //alert(i + "2");
                            }
                        }

                    });
            }
        }

    }
)
;