App.Views.QuestionAnswerItem = Marionette.ItemView.extend({

    tagName: 'li',
    className: 'list-group-item',

    initialize: function() {
        this.template = App.Templates.get('question_answer_item');
    }
});