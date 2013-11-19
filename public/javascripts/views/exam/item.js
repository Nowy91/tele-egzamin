App.Views.ExamItem = Marionette.ItemView.extend({

    tagName: 'tr',

    events: {
        'click a': 'show'
    },

    initialize: function() {
        this.template = App.Templates.get('exam_item');
    },

    show: function() {
        Teleegzam.Controllers.Exam.showExam(this.model.id);
    }

});