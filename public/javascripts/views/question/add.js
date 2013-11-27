App.Views.QuestionAdd = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function () {
        this.template = App.Templates.get('question_add');
    },

    submit: function (e) {
        e.preventDefault();

        var newQuestion = new App.Models.Question({
            content: $(e.currentTarget).find('#content').val(),
            maxPoints: $(e.currentTarget).find('input#maxpoints').val(),
            examId: this.model.id
        });

        var answer;
        var answers = new App.Collections.QuestionAnswers;

        $('.answer').each(function (input) {
            answer = new App.Models.QuestionAnswer({
                content: $(this).find('input[type=text]').val(),
                isCorrect: $(this).find('input[type=checkbox]').is(':checked')
            });
            if (answer.get('content') != "")
                answers.add(answer);
        });

        Teleegzam.Controllers.Question.add(newQuestion, answers);

    }

});