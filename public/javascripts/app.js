window.Teleegzam = new Marionette.Application();

Teleegzam.addRegions({
    mainRegion: '#main-content'
});

Teleegzam.on("initialize:after", function() {
});

Teleegzam.addInitializer(function() {
    this.Router = new App.Router({controller: API});
    Backbone.history.start();
});