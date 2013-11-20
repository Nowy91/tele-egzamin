App.Router = Marionette.AppRouter.extend({

    appRoutes: {
        '': 'index',
        'exams': 'exams',
        'examiners': 'examiners'
    }

});

var API = {

    index: function() {
        Teleegzam.LoginController.index();
    },

    exams: function() {
        Teleegzam.ExamController.showAll();
    },

    examiners: function() {
        Teleegzam.ExaminerController.showAll();
    }

}