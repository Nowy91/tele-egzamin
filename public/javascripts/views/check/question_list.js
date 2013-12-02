App.Views.CheckQuestionList = Marionette.CompositeView.extend({

    itemView: App.Views.CheckQuestionItem,
    itemViewContainer: 'table',

    initialize: function () {
        this.template = App.Templates.get('check_question_list');
    }

});
