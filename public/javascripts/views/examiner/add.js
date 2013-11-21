App.Views.ExaminerAdd = Marionette.ItemView.extend({
    events: {
    'submit #add_examiner': 'submit_add'
    },
    initialize:function(){
        this.template = App.Templates.get('examiner_add');
    },
    submit_add: function(e) {
        e.preventDefault();
        var newUser = new App.Models.User({
            firstname: $(e.currentTarget).find('input#firstname').val(),
            lastname: $(e.currentTarget).find('input#lastname').val(),
            username: $(e.currentTarget).find('input#username').val(),
            password: $(e.currentTarget).find('input#password').val(),
            email: $(e.currentTarget).find('input#email').val()
        });
        Teleegzam.ExaminerController.addExaminer(newUser);
    }
});
