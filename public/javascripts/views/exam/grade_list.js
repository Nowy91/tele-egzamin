App.Views.ExamGradeList = Marionette.CompositeView.extend({

    itemViewContainer: 'ul',

    itemView: App.Views.ExamGradeItem,


    initialize: function () {
        this.template = App.Templates.get('exam_grade_list');
    }

});