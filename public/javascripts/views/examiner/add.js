App.Views.ExaminerAdd = Marionette.ItemView.extend({
    events: {
    'submit #add_examiner': 'submit_add'
    },
    initialize:function(){
        this.template = App.Templates.get('examiner_add');
    },
    submit_add: function(e) {
        e.preventDefault();
        var password = $(e.currentTarget).find('input#password').val();
        var confirm_password = $(e.currentTarget).find('input#confirm_password').val();
        if(password == confirm_password){
            var hash = CryptoJS.SHA1($(e.currentTarget).find('input#password').val()).toString();
            var newUser = new App.Models.User({
                firstname: $(e.currentTarget).find('input#firstname').val(),
                lastname: $(e.currentTarget).find('input#lastname').val(),
                username: $(e.currentTarget).find('input#username').val(),
                password: hash,
                email: $(e.currentTarget).find('input#email').val()
            });
            Teleegzam.Controllers.Examiner.addExaminer(newUser);
        }
        else{
            alert('Hasło i potwierdzenie hasła muszą być takie same');
        }


    }
});
