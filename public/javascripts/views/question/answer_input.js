App.Views.QuestionAnswerInput = Marionette.ItemView.extend({

    className: 'input-group answer',

    initialize: function() {
        this.template = App.Templates.get('question_answer_input');
    }

});