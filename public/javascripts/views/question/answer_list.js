App.Views.QuestionAnswerList = Marionette.CompositeView.extend({

    itemViewContainer: 'ul',

    itemView: App.Views.QuestionAnswerItem,


    initialize: function () {
        this.template = App.Templates.get('question_answer_list');
    }

});