App.Views.QuestionAnswerEdit = Marionette.CompositeView.extend({

    tagName: 'form',
    className: 'form-horizontal',

    itemView: App.Views.QuestionAnswerInput,

    itemViewContainer: '.answers',

    events: {
        'submit': 'submit'
    },

    initialize: function () {
        this.template = App.Templates.get('question_answer_edit');
    },

    submit: function (e) {
        e.preventDefault();

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
        Teleegzam.Controllers.Question.editAnswers(answers);

    }

});