Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var layout;
    var collection;
    var examModel;
    var examId;
    var questionId;

    Controller.Question = {

        showQuestions: function() {
            examModel = Teleegzam.Controllers.Exam.getModel("examModel");
            layout = Teleegzam.Controllers.Exam.getModel("layout");
            examId = examModel.id;

            var getQuestions = $.ajax({
                type: 'GET',
                url: '/exam/view/'+examId+'/questions',
                dataType: 'json'
            });
            $.when(getQuestions).done(function (questions) {

                collection = new App.Collections.Questions(questions);
                var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});

                layout.content.show(questionsList);

            });
        },

        addQuestionForm: function(){
            var addQuestionView = new App.Views.QuestionAdd({model: examModel});
            layout.content.show(addQuestionView);
        },

        addQuestion: function(question) {

            var addExam = $.ajax({
                type: 'POST',
                url: '/questions/add',
                data: question.toJSON(),
                dataType: 'json'
            });

            $.when(addExam).done(function(newQuestion) {
                collection.add(newQuestion);
                var questionList = new App.Views.QuestionList({collection: collection, model: examModel});
                layout.content.show(questionList);
            });
        },

        showQuestion: function(path) {

            var getExam = $.ajax({
                type: 'GET',
                url: path,
                dataType: 'json'
            });

            $.when(getExam).done(function (question) {
                var questionModel = new App.Models.Question(question);
                questionModel.set ({title: examModel.get("title")});
                layout.content.show(new App.Views.QuestionView({model: questionModel}));
                questionId = questionModel.id;
            });
        },

        deleteQuestion: function () {

            var deleteQuestion = $.ajax({
                type: 'DELETE',
                url: '/questions/delete/' + questionId
            });

            $.when(deleteQuestion).done(function () {
                var deletedModel = collection.get(questionId);
                collection.remove(questionId);

                var questionsList = new App.Views.QuestionList({collection: collection, model: examModel});

                layout.content.show(questionsList);
            });
        }

    }

});
