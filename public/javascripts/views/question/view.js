App.Views.QuestionView = Marionette.ItemView.extend({

    events: {
        'click a.btn-warning editQuestion': 'editQuestion',
        'click a.btn-danger': 'deleteQuestion',
        'click a.editAnswersForm': 'editAnswersForm'
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
    },
    editAnswersForm: function (e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.editAnswersForm();
    }
})