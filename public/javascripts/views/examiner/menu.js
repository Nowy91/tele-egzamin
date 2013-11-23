App.Views.ExaminerMenu = Marionette.ItemView.extend({
    events: {
        'click .back-button': 'backToExaminerList'
    },
    initialize: function () {
        this.template = App.Templates.get('examiner_menu');
    },
    backToExaminerList: function () {
        Teleegzam.Controllers.Examiner.showAll();
    }
})