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
                            questionsCollection.at(i).set('studentAnswer', currentAnswer[0].get('content'));
                            //else questionsCollection.at(i).set('studentAnswer', "");
                        }

                        examModel.set('token', token);

                        var checkingView = new App.Views.CheckQuestionList({collection: questionsCollection, model: examModel})
                        layout.content.show(checkingView);

                    }
                )

            }
        }

    }
)
;