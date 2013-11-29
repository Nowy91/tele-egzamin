App.Views.StudentExam = Marionette.ItemView.extend({

    events: {
        'click .nextQuestion': 'changeQuestion',
        'click .previousQuestion': 'changeQuestion',
        'click button': 'changeQuestion',
        'click .closeExam': 'closeExam'
    },

    initialize: function () {
        this.template = App.Templates.get('student_exam');
    },

    changeQuestion: function () {
        var currentAnswer = $('#myTextArea').val();
        if (currentAnswer == undefined) {
            currentAnswer = [];
            $('.answer').each(function () {
                var answer = {
                    content: $(this).find('input[type=text]').attr('placeholder'),
                    isSet: $(this).find('input[type=checkbox]').is(':checked')
                }

                if (answer.isSet == true)
                    currentAnswer.push(answer.content);
            });
        }
        var currentQuestion = parseInt($('.btn-primary').attr('id')) - 1;
        Teleegzam.Controllers.Student.changeQuestion(currentQuestion, currentAnswer);
    },

    closeExam: function () {
        Teleegzam.Controllers.Student.saveAnswers();
    }
})

