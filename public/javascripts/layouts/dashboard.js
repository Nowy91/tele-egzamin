App.Layouts.Dashboard = Marionette.Layout.extend({

    regions: {
        header: '#header',
        menu: '#menu_hook',
        content: '#body_hook'
    },

    initialize: function() {
        this.template = App.Templates.get('dashboard');
    }

});