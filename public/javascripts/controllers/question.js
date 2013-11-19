Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;
    var questionModel;


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
                collection = new App.Collections.Questions(questions);
                collection.sort();
                var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});
                layout.content.show(questionsList);
            });
        },

        addForm: function () {
            var addQuestionView = new App.Views.QuestionAdd({model: examModel});
            layout.content.show(addQuestionView);
        },

        add: function (question) {

            var addExam = $.ajax({
                type: 'POST',
                url: '/questions/add',
                data: question.toJSON(),
                dataType: 'json'
            });

            $.when(addExam).done(function (newQuestion) {
                collection.add(newQuestion);
                var questionList = new App.Views.QuestionList({collection: collection, model: examModel});
                layout.content.show(questionList);
            });
        },

        showSingle: function (qId) {

            questionModel = collection.get(qId);
            questionModel.set({title: examModel.get("title")});
            layout.content.show(new App.Views.QuestionView({model: questionModel}));

        },

        delete: function () {

            var deleteQuestion = $.ajax({
                type: 'DELETE',
                url: '/questions/delete/' + questionModel.id
            });

            $.when(deleteQuestion).done(function () {
                collection.remove(questionModel);
                var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});
                layout.content.show(questionsList);
            });
        },
        editForm: function () {
            var editForm = new App.Views.QuestionEdit({ model: questionModel});
            layout.content.show(editForm);
        },
        edit: function (question) {

            var editQuestion = $.ajax({
                type: 'POST',
                url: '/questions/edit/' + questionModel.id,
                data: question.toJSON(),
                dataType: 'json'
            });

            $.when(editQuestion).done(function (newQuestion) {
                collection.get(newQuestion).set({content: newQuestion.content, maxPoints: newQuestion.maxPoints});
                collection.sort();
                var questionList = new App.Views.QuestionList({collection: collection, model: examModel});
                layout.content.show(questionList);
            });
        }
    }
});
