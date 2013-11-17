App.Views.ExamMenu = Marionette.ItemView.extend({

    events: {
        'click .back-button': 'backToExamList'
    },

    initialize: function () {
        this.template = App.Templates.get('exam_menu');
    },

    backToExamList: function () {
        Teleegzam.ExamController.showAll();
    }

})