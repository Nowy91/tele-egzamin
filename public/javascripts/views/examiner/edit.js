App.Views.ExaminerEdit = Marionette.ItemView.extend({
    events: {
        'submit #edit_examiner': 'submit_edit',
        'click #cancel':'cancel'
    },
    initialize: function(e) {
        this.template = App.Templates.get('examiner_edit');
    },
    submit_edit: function(e) {
        e.preventDefault();
        var newUser = new App.Models.User({
            firstname: $(e.currentTarget).find('input#firstname').val(),
            lastname: $(e.currentTarget).find('input#lastname').val(),
            username: $(e.currentTarget).find('input#username').val(),
            email: $(e.currentTarget).find('input#email').val()
        });
        Teleegzam.Controllers.Examiner.editExaminer(newUser, this.model.id);
    },
    cancel:function(e){
        e.preventDefault();
        Teleegzam.Controllers.Examiner.showExaminer(this.model.id);
    }
});
