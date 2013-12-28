App.Views.ExaminerPassword = Marionette.ItemView.extend({
    events: {
        'submit #examiner_password': 'submit_password',
        'click #cancel':'cancel'
    },
    initialize:function(){
        this.template = App.Templates.get('examiner_password');
    },
    submit_password: function(e) {
        e.preventDefault();
        var password = $(e.currentTarget).find('input#password').val();
        var confirm_password = $(e.currentTarget).find('input#confirm_password').val();
        if(password == confirm_password)
        {
            var hash = CryptoJS.SHA1($(e.currentTarget).find('input#password').val()).toString();
            var newUser = new App.Models.User({
                password: hash
            });
            Teleegzam.Controllers.Examiner.editExaminer(newUser, this.model.id);
        }
        else
        {
            alert('Hasło i potwierdzenia hasła muszą być takie same');
        }

    },
    cancel:function(e){
        e.preventDefault();
        Teleegzam.Controllers.Examiner.showExaminer(this.model.id);
    }
})