App.Views.ExamGradeItem = Marionette.ItemView.extend({

    tagName: 'li',
    className: 'list-group-item',

    initialize: function() {
        this.template = App.Templates.get('exam_grade_item');
    }
});