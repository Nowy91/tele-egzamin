App.Views.ExamList = Marionette.CompositeView.extend({

    itemView: App.Views.ExamItem,
    itemViewContainer: 'tbody',

    events: {
        'click .paginator li.nextOne a': 'nextPage',
        'click .paginator li.nextTen a': 'nextPages',
        'click .paginator li.prevOne a': 'prevPage',
        'click .paginator li.prevTen a': 'prevPages',
        'click .paginator li.page a': 'goToPage',
        'click table th': 'sort',
        'click .btn-group li a': 'pagesOnView'
    },


    initialize: function () {
        this.template = App.Templates.get('exam_list');

    },

    onShow: function() {
        Teleegzam.Utils.Paginator.show(this.collection, $('div.paginator'));
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

        if (header == 'Tytuł') { sortKey = 'title'; }
        if (header == 'Data') { sortKey = 'date'; }
        if (header == 'Liczba studentów') { sortKey = 'numberOfStudents'; }
        if (header == 'Czas trwania') { sortKey = 'duration'; }
        if (header == 'Status') { sortKey = 'status'; }

        Teleegzam.Utils.Paginator.sort(sortKey);
    },

    pagesOnView: function (e) {
        Teleegzam.Utils.Paginator.pagesOnView(e.currentTarget);
    }

 });