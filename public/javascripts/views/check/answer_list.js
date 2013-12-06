App.Views.CheckAnswerList = Marionette.CompositeView.extend({

    itemView: App.Views.CheckAnswerItem,
    itemViewContainer: 'ul',

    initialize: function() {
        this.template = App.Templates.get('check_answer_list');
    }
});
