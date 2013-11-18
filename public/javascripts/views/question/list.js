App.Views.QuestionList = Marionette.CompositeView.extend({

    itemView: App.Views.QuestionItem,
    itemViewContainer: 'tbody',

    events: {
        'click a.btn-success': 'addQuestion'
    },

    initialize: function () {
        this.template = App.Templates.get('question_list');
    },

    addQuestionForm: function(e) {
        e.preventDefault();
        Teleegzam.ExamController.addQuestionForm(e.target.href);
    }
});