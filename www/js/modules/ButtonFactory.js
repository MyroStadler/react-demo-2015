/**
 * @jsx React.DOM
 */
define(["React"], function(React) {
    return {
        create: function(label, eventType, AppDispatcher) {
            return React.createClass({
                onClick: function(e){
                    AppDispatcher.dispatch({
                        type: this.state.eventType
                    });
                },
                getInitialState: function() {
                  return {label: label, eventType: eventType};
                },
                render: function() {
                    return ( 
                        React.DOM.button({className: "btn btn-lg btn-primary", onClick: this.onClick}, this.state.label)
                    );
                }
            });
        }
    };
});