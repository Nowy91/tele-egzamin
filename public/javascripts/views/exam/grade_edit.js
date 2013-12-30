App.Views.ExamGradeEdit = Marionette.CompositeView.extend({

    tagName: "table",
    className: "table table-bordered",
    itemView: App.Views.ExamGradeInput,
    itemViewContainer: ".gradesTable",

    initialize: function () {
        this.template = App.Templates.get('exam_grade_edit');
    }

});