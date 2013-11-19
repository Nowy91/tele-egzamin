App.Views.ExamMenu = Marionette.ItemView.extend({

    events: {
        'click .back-button': 'backToExamList',
        'click .exam_questions': 'questionList'
    },

    initialize: function () {
        this.template = App.Templates.get('exam_menu');
    },

    questionList: function() {
        this.switchSelectedItem('exam_questions');
        Teleegzam.Controllers.Question.showQuestions();
    },

    backToExamList: function () {
        Teleegzam.Controllers.Exam.showAll();
    },

    switchSelectedItem: function(name) {
        $('li.active').removeClass('active');
        $('a.' + name).parent().addClass('active');
    }

})