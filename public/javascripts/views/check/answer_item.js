App.Views.CheckAnswerItem = Marionette.ItemView.extend({

    tagName: 'li',

    attributes: {
        class:  "list-group-item"
    },

    initialize: function () {

        if (this.model.get('isSet') != undefined)
        {
            if(this.model.get('isSet')==true)this.$el.attr ("class","list-group-item greenItem");
            else this.$el.attr("class", "list-group-item redItem" );
        }
        else
        {
            if(this.model.get('isCorrect')==true)this.$el.attr ("class","list-group-item greenItem");
            else this.$el.attr("class", "list-group-item redItem" );
        }
        this.template = App.Templates.get('check_answer_item');
    }

});
