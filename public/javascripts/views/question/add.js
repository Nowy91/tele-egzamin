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
            maxPoints: $(e.currentTarget).find('input#maxPoints').val(),
            examId: this.model.id,
            type: 'open',
            imageName: ""
        });

        var answer;
        var answers = new App.Collections.QuestionAnswers;

        $('.answer').each(function (input) {
            answer = new App.Models.QuestionAnswer({
                content: $(this).find('input[type=text]').val(),
                isCorrect: $(this).find('input[type=checkbox]').is(':checked')
            });

            if (answer.get('content') != "") {
                answers.add(answer);
            }
        });

        if (answers.length != 0) {
            newQuestion.set({type: 'closed'});
        }
        console.log("I CHECK FILE INPUT");
        if($(e.currentTarget).find('input.fileUrl').val() !== ""){
            newQuestion.set({imageName: $(e.currentTarget).find('input.fileUrl').val()});
            if($(e.currentTarget).find('.drawCheck').hasClass('btn-success')){
                newQuestion.set({type: 'image'});
            }
        }

        Teleegzam.Controllers.Question.add(newQuestion, answers);
    }

});