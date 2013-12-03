App.Views.CheckQuestionList = Marionette.CompositeView.extend({

    itemView: App.Views.CheckQuestionItem,
    itemViewContainer: 'table',

    events: {
        'click a.pointsAccept': 'pointsAccept'
    },


    initialize: function () {
        this.template = App.Templates.get('check_question_list');
    },

    pointsAccept: function (e) {

        e.preventDefault();

        var sum = 0;
        $('input').each(function () {
            sum += parseFloat($(this).val());
        })

        Teleegzam.Controllers.Check.pointsAccept(sum);

    }
});
