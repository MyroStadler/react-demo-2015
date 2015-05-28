/**
 * @jsx React.DOM
 */
define(["React", "underscore"], function(React, _) {
    return {
        create: function(Model) {
            return React.createClass({  
                // TODO: this render timeout needs to be implemented at a higher level encapsulating all renders
                //  otherwise this logic is repeated everywhere
                renderTimeout:0,
                modelChanged: function(){
                    clearTimeout(this.renderTimeout);
                    var self = this;
                    // crude invalidation, this can be improved by using state
                    //  for now just render the model
                    this.renderTimeout = setTimeout(function(){ self.forceUpdate(); }, 100 );
                },
                getInitialState: function() {
                    return Model;
                },
                componentDidMount: function() {  
                    Model.bind( 'change', this.modelChanged );
                },
                render: function() {
                    // ALL entries
                    var options = _.map(Model.entries, function(e) { return (React.DOM.option({value: e.firstname}, e.firstname)); });
                    var totalAge = _.reduce(Model.entries, function(memo, e){ return memo + e.age; }, 0);
                    return (
                        React.DOM.div({className: "results-holder"}, 
                            React.DOM.h2(null, "Results"), 
                            React.DOM.div(null, 
                                React.DOM.select({tabindex: "4", className: "select"}, 
                                    options
                                )
                            ), 
                            React.DOM.div(null, 
                                React.DOM.p(null, "Total age: ", totalAge)
                            )
                        )
                    );
                }
            });
        }
    };
});