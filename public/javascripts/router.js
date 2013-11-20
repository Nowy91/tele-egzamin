App.Router = Marionette.AppRouter.extend({

    appRoutes: {
        '': 'index',
        'exams': 'exams',
        'examiners': 'examiners'
    }

});

var API = {

    index: function() {
        Teleegzam.Controllers.Login.index();
    },

    exams: function() {
        Teleegzam.Controllers.Exam.showAll();
    },

    examiners: function() {
        Teleegzam.ExaminerController.showAll();
    }

}