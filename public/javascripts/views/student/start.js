App.Views.StudentStart = Marionette.ItemView.extend({


    initialize: function() {
        this.template = App.Templates.get('student_start');
    },

    events: {
        'click .startExam': 'startExam'
    },

    startExam: function(){
         Teleegzam.Controllers.Student.start();
    }
})
