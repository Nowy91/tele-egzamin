App.Views.ExamExecute = Marionette.ItemView.extend({

    events: {
        'click a.btn-success': 'activation',
        'click a.btn-warning': 'deactivation'
    },

    initialize: function () {
        this.template = App.Templates.get('exam_execute');
    },

    render: function () {
        var tokens = this.model.tokens;

        var generatedTokens = 0;
        var activatedTokens = 0;
        var finishedTokens = 0;

        tokens.forEach(function (token) {
            switch (token.status) {
                case 'active':
                    generatedTokens++;
                    break;

                case 'executed':
                    generatedTokens++;
                    activatedTokens++;
                    finishedTokens++;
                    break;

                case 'in_progress':
                    generatedTokens++;
                    activatedTokens++;
                    break;
            }
        });

        this.model.generatedTokens = generatedTokens;
        this.model.activatedTokens = activatedTokens;
        this.model.finishedTokens = finishedTokens;

        $(this.el).html(this.template(this.model));
    },

    onShow: function () {
        var that = this;
        App.socketConnection();
        App.Socket.on('entrance of student', function(data) {
            console.log('ktos wszedl ' + data.token);
            if (data.examId === that.model.id) {
                that.model.activatedTokens++;
                $('span.activated').text(that.model.activatedTokens);
            }
        });

        App.Socket.on('exam finished', function (data) {
            console.log('ktos zakonczyl ' + data.token);
            if (data.examId === that.model.id) {
                that.model.finishedTokens++;
                $('span.finished').text(that.model.finishedTokens);
            }
        });

        if (this.model.status === 'activated') {
            $('.exam-toggle-btn')
                .addClass('btn-warning')
                .text('Koniec egzaminu');
        }

        if (this.model.status === 'ready') {
            $('.exam-toggle-btn')
                .addClass('btn-success')
                .text('Start egzaminu');
        }
    },

    onClose: function () {
        App.Socket.removeAllListeners();
        App.Socket.disconnect();
    },

    activation: function () {
        Teleegzam.Controllers.Exam.activate(this.model.id, function (done) {
            if (done) {
                $('.exam-toggle-btn')
                    .removeClass('btn-success')
                    .addClass('btn-warning')
                    .text('Koniec egzaminu');
                $('.status').text('activated');
            }
        });
    },

    deactivation: function () {
        Teleegzam.Controllers.Exam.deactivate(this.model.id, function (done) {
            if (done) {
                $('.exam-toggle-btn')
                    .removeClass('btn-warning')
                    .addClass('btn-success')
                    .text('Start egzaminu');
                $('.status').text('ready');
            }
        });
    }

})