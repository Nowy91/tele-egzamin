App.Views.StudentExam = Marionette.ItemView.extend({

    events: {
        'click .nextQuestion': 'changeQuestion',
        'click .previousQuestion': 'changeQuestion',
        'click button': 'changeQuestion',
        'click .closeExam': 'closeExam'
    },

    initialize: function() {
        this.template = App.Templates.get('student_exam');
    },

    changeQuestion: function(){
        var answer = $('#myTextArea').val();
        var currentQuestion = parseInt($('.btn-primary').attr('id'))-1;
        Teleegzam.Controllers.Student.changeQuestion(currentQuestion, answer);
    },

    closeExam: function(){
        Teleegzam.Controllers.Student.saveAnswers();
    }
})

