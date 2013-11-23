App.Views.MenuAdmin = Marionette.ItemView.extend({
    events: {
        'click a.examiners': 'examiners',
        'click a.add_examiner': 'addExaminer'
    },
    initialize: function () {
        this.template = App.Templates.get('menu_admin');
    },
    examiners: function() {
        Teleegzam.Controllers.Examiner.switchSelectedItem('examiners');
        Teleegzam.Controllers.Examiner.showAll();
    },
    addExaminer: function() {
        Teleegzam.Controllers.Examiner.switchSelectedItem('add_examiner');
        Teleegzam.Controllers.Examiner.addForm();
    }
});
