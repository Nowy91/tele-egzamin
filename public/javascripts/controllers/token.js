Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var examModel;
    var layout;
    var collection;

    Controller.Token = {

        showAll: function () {
            examModel = Teleegzam.Controllers.Exam.getModel("examModel");
            layout = Teleegzam.Controllers.Exam.getModel("layout");

            var getTokens = $.ajax({
                type: 'GET',
                url: '/tokens/' + examModel.id,
                dataType: 'json'
            });

            $.when(getTokens)
                .done(function (tokens) {
                    collection = new App.Collections.Tokens(tokens);
                    layout.content.show(new App.Views.TokenList({collection: collection, model: examModel}));
                });
        },

        generate: function () {
            var generateTokens = $.ajax({
                type: 'POST',
                url: '/tokens/generate/',
                dataType: 'json',
                data: examModel.toJSON()
            });

            $.when(generateTokens)
                .done(function (tokens) {
                    collection.add(tokens);
                    layout.content.show(new App.Views.TokenList({collection: collection, model: examModel}));
                });
        }
    }

});