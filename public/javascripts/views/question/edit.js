App.Views.QuestionEdit = Marionette.ItemView.extend({

    events: {
        'submit': 'submit'
    },

    initialize: function() {
        this.template = App.Templates.get('question_edit');
    },

    submit: function(e) {
        e.preventDefault();

        var newQuestion = new App.Models.Question({
            content: $(e.currentTarget).find('#content').val(),
            maxPoints: $(e.currentTarget).find('input#maxpoints').val(),
            examId: this.model.id
        });

        Teleegzam.Controllers.Question.edit(newQuestion);
    }

});