App.Models.Exam = Backbone.Model.extend({
    render: function() {
        this.formattedDate = this.date.getDay();
        console.log( this.formattedDate);
    }

});