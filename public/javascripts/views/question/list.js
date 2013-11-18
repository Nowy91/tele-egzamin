App.Views.QuestionList = Marionette.CompositeView.extend({

    itemView: App.Views.QuestionItem,
    itemViewContainer: 'tbody',

    events: {
        'click a.question_add': 'addQuestionForm'
    },

    initialize: function () {
        this.template = App.Templates.get('question_list');
    },

    addQuestionForm: function(e) {
        e.preventDefault();
        Teleegzam.QuestionController.addQuestionForm(e.target.href);
    }
});