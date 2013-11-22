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
        for (i = 0; i < 6; i++)
            if ($(e.currentTarget).find('input#answerContent'+i).val() != "") {
                answer= new App.Models.QuestionAnswer({
                    content: $(e.currentTarget).find('#answerContent'+i).val(),
                    isCorrect: $(e.currentTarget).find('#answerCorrect'+i).is(':checked')
                });
                console.log("Uzupełniłem dane answer "+i);
                answers.add(answer);
            }


        Teleegzam.Controllers.Question.add(newQuestion, answers);

    }

});