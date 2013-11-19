App.Views.QuestionItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'show'
    },

    initialize: function() {
        this.template = App.Templates.get('question_item');
    },

    show: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.showSingle(this.model.id);
    }
});