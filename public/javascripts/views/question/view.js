App.Views.QuestionView = Marionette.ItemView.extend({

    events: {
        'click a.btn-danger': 'deleteQuestion'
    },

    initialize: function() {
        this.template = App.Templates.get('question_view');
    },

    deleteQuestion: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.delete();
    },

    editQuestion: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.editForm();
    }
})