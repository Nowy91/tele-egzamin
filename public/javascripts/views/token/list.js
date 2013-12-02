App.Views.ActiveTokenList = Marionette.CompositeView.extend({

    itemView: App.Views.TokenItem,
    itemViewContainer: 'tbody',

    events: {
        'click a.btn-success': 'generateTokens',
        'click .paginator li.nextOne a': 'nextPage',
        'click .paginator li.nextTen a': 'nextPages',
        'click .paginator li.prevOne a': 'prevPage',
        'click .paginator li.prevTen a': 'prevPages',
        'click .paginator li.page a': 'goToPage',
        'click table th': 'sort'
    },

    initialize: function () {
        this.template = App.Templates.get('token_list');
    },

    onShow: function() {
        Teleegzam.Utils.Paginator.show(this.collection, $('div.paginator'));
    },

    generateTokens: function() {
        Teleegzam.Controllers.Token.generate();
    },

    goToPage: function (e) {
        Teleegzam.Utils.Paginator.goToPage(e.currentTarget);
    },

    nextPage: function() {
        Teleegzam.Utils.Paginator.nextPage();
    },

    nextPages: function() {
        Teleegzam.Utils.Paginator.nextPages();
    },

    prevPage: function() {
        Teleegzam.Utils.Paginator.previousPage();
    },

    prevPages: function() {
        Teleegzam.Utils.Paginator.previousPages();
    },

    sort: function(e) {
        header = $(e.currentTarget).text();

        if (header == 'token') { sortKey = 'content'; }
        if (header == 'status') { sortKey = 'status'; }
        if (header == 'data wygenerowania') { sortKey = 'createdAd'; }

        Teleegzam.Utils.Paginator.sort(sortKey);
    }

});