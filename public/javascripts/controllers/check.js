Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var examModel;
    var layout;
    var collection;

    Controller.Check = {

        showAll: function () {
            examModel = Teleegzam.Controllers.Exam.getModel("examModel");
            layout = Teleegzam.Controllers.Exam.getModel("layout");

            var getTokens = $.ajax({
                type: 'GET',
                url: '/tokens/' + examModel.id +"/executed",
                dataType: 'json'
            });

            $.when(getTokens)
                .done(function (tokens) {
                    collection = new App.Collections.Tokens(tokens);
                    layout.content.show(new App.Views.ExecutedTokenList({collection: collection, model: examModel}));
                });
        }
    }

});