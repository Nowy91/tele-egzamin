App.Views.StudentCheckAnswer = Marionette.ItemView.extend({

    className: 'input-group answer',

    initialize: function() {
        this.template = App.Templates.get('student_check_answer');
    }

})
