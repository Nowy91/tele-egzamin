App.Layouts.Student = Marionette.Layout.extend({

    regions: {
        header: '#header',
        exam: '#exam',
        question: '#question',
        answer: '#answer'
    },

    initialize: function() {
        this.template = App.Templates.get('student_layout');
    }

});