App.Views.QuestionList = Marionette.CompositeView.extend({

    itemView: App.Views.QuestionItem,
    itemViewContainer: 'tbody',

    events: {
        'click a.question_add': 'addQuestionForm',
        'click .paginator li.nextOne a': 'nextPage',
        'click .paginator li.nextTen a': 'nextPages',
        'click .paginator li.prevOne a': 'prevPage',
        'click .paginator li.prevTen a': 'prevPages',
        'click .paginator li.page a': 'goToPage',
        'click table th': 'sort'
    },

    initialize: function () {
        this.template = App.Templates.get('question_list');
    },

    onShow: function() {
        Teleegzam.Utils.Paginator.show(this.collection, $('div.paginator'));
    },

    addQuestionForm: function(e) {
        e.preventDefault();
        Teleegzam.Controllers.Question.addForm();
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

        if (header == 'Treść') { sortKey = 'content'; }
        if (header == 'Punkty') { sortKey = 'maxPoints'; }

        Teleegzam.Utils.Paginator.sort(sortKey);
    }
});