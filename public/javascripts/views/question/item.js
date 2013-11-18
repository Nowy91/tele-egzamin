App.Views.QuestionItem = Marionette.ItemView.extend({

    tagName: 'tr',

    initialize: function() {
        this.template = App.Templates.get('question_item');
    }

});