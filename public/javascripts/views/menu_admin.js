App.Views.MenuAdmin = Marionette.ItemView.extend({
    events: {
        'click a.examiners': 'examiners',
        'click a.add_examiner': 'addExaminer'
    },
    initialize: function () {
        this.template = App.Templates.get('menu_admin');
    },
    examiners: function() {
        Teleegzam.ExaminerController.switchSelectedItem('examiners');
        Teleegzam.ExaminerController.showAll();
    },
    addExaminer: function() {
        Teleegzam.ExaminerController.switchSelectedItem('add_examiner');
        Teleegzam.ExaminerController.addForm();
    }
});
