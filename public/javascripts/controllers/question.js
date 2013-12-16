Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var questionCollection;
    var examModel;
    var questionModel;
    var answerCollection;

    Controller.Question = {

        showAll: function () {
            examModel = Teleegzam.Controllers.Exam.getModel("examModel");
            layout = Teleegzam.Controllers.Exam.getModel("layout");

            var getQuestions = $.ajax({
                type: 'GET',
                url: '/exam/view/' + examModel.id + '/questions',
                dataType: 'json'
            });

            $.when(getQuestions).done(function (questions) {
                questionCollection = new App.Collections.Questions(questions);
                var questionsList = new App.Views.QuestionList({collection: questionCollection, model: examModel});
                layout.content.show(questionsList);
            });
        },

        addForm: function () {
            var addQuestionView = new App.Views.QuestionAdd({model: examModel});
            layout.content.show(addQuestionView);
        },

        add: function (question, answers) {
            var addQuestion = $.ajax({
                type: 'POST',
                url: '/questions/add',
                data: question.toJSON(),
                dataType: 'json'
            });
            $.when(addQuestion).done(function (newQuestion) {
                if (newQuestion.isValid) {
                    questionCollection.add(newQuestion);
                    if (answers.length != 0) {
                        var addAnswers = $.ajax({
                            type: 'POST',
                            url: '/questions/answers/add/' + newQuestion.id,
                            data: JSON.stringify(answers),
                            contentType: 'application/json',
                            dataType: 'json'
                        });
                        $.when(addAnswers).done(function () {
                            var questionList = new App.Views.QuestionList({collection: questionCollection, model: examModel});
                            layout.content.show(questionList);
                        });
                    }
                    else
                    {

                        var questionList = new App.Views.QuestionList({collection: questionCollection, model: examModel});
                        layout.content.show(questionList);
                    }
                }
                else {
                    Teleegzam.Validator.Form.messages(newQuestion);
                }
            });
        },

        showSingle: function (qId) {

            questionModel = questionCollection.get(qId);
            questionModel.set({title: examModel.get("title")});
            layout.content.show(new App.Views.QuestionView({model: questionModel}));
            var getQuestionAnswers = $.ajax({
                type: 'GET',
                url: '/questions/view/' + questionModel.id + '/answers',
                dataType: 'json'
            });

            $.when(getQuestionAnswers).done(function (answers) {
                if (answers.length != 0) {
                    answerCollection = new App.Collections.QuestionAnswers(answers);
                    var answersList = new App.Views.QuestionAnswerList({collection: answerCollection});
                    layout.addRegion('answers', "#answers");
                    layout.answers.show(answersList);
                }
            });
        },

        delete: function () {

            var deleteQuestion = $.ajax({
                type: 'DELETE',
                url: '/questions/delete/' + questionModel.id
            });

            $.when(deleteQuestion).done(function () {
                questionCollection.remove(questionModel);
                var questionsList = new App.Views.QuestionList({collection: questionCollection, model: examModel});
                layout.content.show(questionsList);
            });
        },
        editForm: function () {
            var editForm = new App.Views.QuestionEdit({ model: questionModel});
            layout.content.show(editForm);
        },

        editAnswersForm: function () {
            var editAnswersForm = new App.Views.QuestionAnswerEdit({collection: answerCollection});
            layout.content.show(editAnswersForm);
        },

        edit: function (question) {

            var editQuestion = $.ajax({
                type: 'POST',
                url: '/questions/edit/' + questionModel.id,
                data: question.toJSON(),
                dataType: 'json'
            });

            $.when(editQuestion).done(function (newQuestion) {
                if (newQuestion.isValid) {
                    questionCollection
                        .get(newQuestion)
                        .set({content: newQuestion.content, maxPoints: newQuestion.maxPoints});

                    var questionList = new App.Views.QuestionList({
                        collection: questionCollection,
                        model: examModel
                    });

                    layout.content.show(questionList);
                }
                else {
                    Teleegzam.Validator.Form.messages(newQuestion);
                }
            });
        },

        editAnswers: function (answers) {

            answers.forEach(function (model) {
                model.set({questionId: questionModel.id});
            });

            var editAnswers = $.ajax({
                type: 'POST',
                url: '/questions/answers/edit/' + questionModel.id,
                data: JSON.stringify(answers),
                contentType: 'application/json',
                dataType: 'json'
            });

            layout.content.show(new App.Views.QuestionView({model: questionModel}));

            $.when(editAnswers).done(function (answers) {
                if (answers.length != 0) {
                    answerCollection = new App.Collections.QuestionAnswers(answers);
                    var answersList = new App.Views.QuestionAnswerList({collection: answerCollection});
                    layout.addRegion('answers', "#answers");
                    layout.answers.show(answersList);
                }
            });
        }
    }
});
