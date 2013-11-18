App.Views.QuestionAdd = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('question_add');
    },

    submit: function(e) {
        e.preventDefault();

        var newQuestion = new App.Models.Question({
            content: $(e.currentTarget).find('#content').val(),
            maxPoints: $(e.currentTarget).find('input#maxpoints').val(),
            examId: this.model.id
        });
        console.log(newQuestion.toString());
        Teleegzam.QuestionController.addQuestion(newQuestion);
    }

});