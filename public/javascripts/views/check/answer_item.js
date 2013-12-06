App.Views.CheckAnswerItem = Marionette.ItemView.extend({

    tagName: 'li',
    className: 'list-group-item',

    initialize: function () {
        if (this.model.get('isSet') != undefined)
        {
            this.template = App.Templates.get('check_student_item');
        }
        else
        {
            this.template = App.Templates.get('check_answer_item');
        }
    }

});
