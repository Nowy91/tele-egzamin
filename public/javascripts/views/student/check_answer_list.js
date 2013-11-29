App.Views.StudentCheckAnswerList = Marionette.CompositeView.extend({

    itemView: App.Views.StudentCheckAnswer,
    itemViewContainer: 'form',

    initialize: function() {
        this.template = App.Templates.get('student_check_answer_list');
    }

});