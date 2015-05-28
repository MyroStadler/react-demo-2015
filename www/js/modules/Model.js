/**
 * @jsx React.DOM
 requires: jquery
 */
define(["underscore"], function(_) {
    return {
        feedback:{isError: false, isNeutral: true, message: "Welcome to the Test app."},
        entries:[],
        change:function(){
            this.trigger('change');
            return this;
        },
        add: function(obj){
            this.entries.push(obj);
            return this;
        },
        sort: function(){
            this.entries = _.sortBy(this.entries, function(e){ return e.firstname; });
            return this;
        },
        all: function(){
            return this.entries;
        }
    };
});
