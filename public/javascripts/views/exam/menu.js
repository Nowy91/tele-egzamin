App.Views.ExamMenu = Marionette.ItemView.extend({

    events: {
        'click .back-button': 'backToExamList',
        'click .exam_data': 'examData',
        'click .exam_questions': 'questionList',
        'click .exam_tokens': 'tokensList',
        'click .exam_check': 'examCheck',
        'click .exam_checked': 'examChecked',
        'click .exam_activation': 'examActivation'
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

    examChecked: function () {
        Teleegzam.Controllers.Check.showChecked();
    },

    backToExamList: function () {
        Teleegzam.Controllers.Exam.showAll();
    },

    examActivation: function () {
        Teleegzam.Controllers.Exam.execute(this.model.id);
    }

})