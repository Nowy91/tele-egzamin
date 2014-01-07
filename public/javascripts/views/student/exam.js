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

    onShow: function () {
        var that = this;
        App.socketConnection();
        App.Socket.on('deactivated exam', function (examId) {
            that.closeExam();
        });
    },

    onClose: function () {
        App.Socket.removeAllListeners();
        App.Socket.disconnect();
    },

    changeQuestion: function () {
        if (document.getElementById('myTextArea')) {
            var currentAnswer = $('#myTextArea').val();
        }

        if (document.getElementById('answers')) {
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

        if (document.getElementById('draw')) {
            var canvas = document.querySelector('#draw');
            currentAnswer = canvas.toDataURL();
        }

        var currentQuestion = parseInt($('.btn-primary').attr('id')) - 1;
        Teleegzam.Controllers.Student.changeQuestion(currentQuestion, currentAnswer);
    },

    closeExam: function () {
        var hash = Teleegzam.Controllers.Student.saveAnswers();
        $('.modal-body').html(hash.toString().substring(0, 10));
        $('#checksumModal').modal();
    }
})

