App.Views.ExamMenu = Marionette.ItemView.extend({

    events: {
        'click .back-button': 'backToExamList',
        'click .exam_questions': 'questionList'

    },

    initialize: function () {
        this.template = App.Templates.get('exam_menu');
    },

    questionList: function(e) {
        Teleegzam.Controllers.Question.showAll();
    },

    backToExamList: function () {
        Teleegzam.Controllers.Exam.showAll();
    }

})