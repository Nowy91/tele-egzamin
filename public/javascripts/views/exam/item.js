App.Views.ExamItem = Marionette.ItemView.extend({

    tagName: 'tr',

    initialize: function() {
        this.template = App.Templates.get('exam_item');
    }

});