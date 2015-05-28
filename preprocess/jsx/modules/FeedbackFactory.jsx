/**
 * @jsx React.DOM
 */
define(["React"], function(React) {
    return {
        create: function(eventedModel) {
            return React.createClass({displayName: 'Feedback',
                renderTimeout:0,
                modelChanged: function(){
                    clearTimeout(this.renderTimeout);
                    var self = this;
                    // crude invalidation, this can be improved by using state
                    //  for now just render the model
                    this.renderTimeout = setTimeout(function(){ self.forceUpdate(); }, 100 );
                },
                componentDidMount: function() {  
                    eventedModel.bind( 'change', this.modelChanged );
                },
                getInitialState: function() {
                  return eventedModel.feedback;
                },
                render: function() {
                    var iconClass = "glyphicon glyphicon-" + (this.state.isError ? "flag" : (this.state.isNeutral ? "hand-down" : "ok"));
                    var msgClass = "feedback " + (this.state.isError ? "error" : (this.state.isNeutral ? "neutral" : "success"));
                    return ( 
                        <div role="alert" tabindex="0" className={msgClass}> <span className={iconClass}></span> {this.state.message}</div>
                    );
                }
            });
        }
    };
});