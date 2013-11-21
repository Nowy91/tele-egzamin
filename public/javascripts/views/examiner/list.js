App.Views.ExaminerList = Marionette.CompositeView.extend({
    itemView: App.Views.ExaminerItem,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('examiner_list');
    }
});
