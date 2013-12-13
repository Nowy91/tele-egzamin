App.Views.StudentStart = Marionette.ItemView.extend({

    events: {
        'click .startExam': 'startExam'
    },

    initialize: function () {
        this.template = App.Templates.get('student_start');
    },

    onShow: function () {
        this.checkButtonStart();
        var that = this;

        socket = io.connect();
        socket.on('activated exam', function (examId) {
            if (that.model.get('id') === examId) {
                that.model.set('status', 'activated');
                that.checkButtonStart();
            }
        });
    },

    startExam: function () {
        Teleegzam.Controllers.Student.start();
    },

    checkButtonStart: function () {
        if (this.model.get('status') === 'activated') {
            $('a.startExam').attr('disabled', false);
            $('span#status').text('activated').toggleClass('green_bg');
        }
        else {
            $('a.startExam').attr('disabled', true);
            $('span#status').text('ready').toggleClass('red_bg');
        }
    }

});
