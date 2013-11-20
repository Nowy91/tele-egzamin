App.Views.ExaminerItem = Marionette.ItemView.extend({
    tagName: 'tr',
    events: {
        'click a': 'show'
    },
    initialize: function() {
        this.template = App.Templates.get('examiner_item');
    },
    show: function(e) {
        e.preventDefault();
        Teleegzam.ExaminerController.showExaminer(this.model.id);
    }
});