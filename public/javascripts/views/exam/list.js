App.Views.ExamList = Marionette.CompositeView.extend({

    itemView: App.Views.ExamItem,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('exam_list');
    }

});