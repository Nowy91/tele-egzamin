Teleegzam.module('Controllers', function (Controller, Teleegzam, Backbone, Marionette, $, _) {

    var examModel;
    var layout;
    var collection;

    Controller.Token = {

        showAll: function (status) {
            examModel = Teleegzam.Controllers.Exam.getModel("examModel");
            layout = Teleegzam.Controllers.Exam.getModel("layout");

            var getTokens = $.ajax({
                type: 'GET',
                url: '/tokens/' + examModel.id + "/active",
                dataType: 'json'
            });

            $.whenDone(getTokens, function (tokens) {
                collection = new App.Collections.Tokens(tokens);
                layout.content.show(new App.Views.ActiveTokenList({collection: collection, model: examModel}));
            });
        },

        generate: function () {
            var generateTokens = $.ajax({
                type: 'POST',
                url: '/tokens/generate/',
                dataType: 'json',
                data: examModel.toJSON()
            });

            $.whenDone(generateTokens, function (tokens) {
                collection.add(tokens);
                Teleegzam.Utils.Paginator.show(collection, $('div.paginator'));
                Teleegzam.Utils.Paginator.setIndexes();
            });
        }
    }

});