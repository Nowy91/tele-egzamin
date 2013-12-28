App.Views.StudentUploadList = Marionette.CompositeView.extend({

    itemView: App.Views.StudentUpload,
    itemViewContainer: 'tbody',

    initialize: function () {
        this.template = App.Templates.get('student_upload_list');
    }

});
