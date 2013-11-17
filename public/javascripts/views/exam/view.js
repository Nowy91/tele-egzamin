App.Views.ExamView = Marionette.ItemView.extend({

    initialize: function() {
        //console.log('tu: ' + this.model);
        this.template = App.Templates.get('exam_view');
    }

})