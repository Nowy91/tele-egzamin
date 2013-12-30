App.Views.ExamGradeInput = Marionette.ItemView.extend({

    className: 'grade newgrade',
    tagName: 'tr',


    initialize: function () {
        this.template = App.Templates.get('exam_grade_input');
    }

});