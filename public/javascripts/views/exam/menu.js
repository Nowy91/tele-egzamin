App.Views.ExamMenu = Marionette.ItemView.extend({

    events: {
        'click .back-button': 'backToExamList',
        'click .exam_data': 'examData',
        'click .exam_questions': 'questionList',
        'click .exam_tokens': 'tokensList',
        'click .exam_check': 'examCheck'
    },

    initialize: function () {
        this.template = App.Templates.get('exam_menu');
    },

    examData: function () {
        Teleegzam.Controllers.Exam.showExam(this.model.id);
    },

    questionList: function () {
        Teleegzam.Controllers.Question.showAll();
    },

    tokensList: function () {
        Teleegzam.Controllers.Token.showAll();
    },

    examCheck: function () {
        Teleegzam.Controllers.Check.showAll();
    },

    backToExamList: function () {
        Teleegzam.Controllers.Exam.showAll();
    }

})