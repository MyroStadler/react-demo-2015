/**
 * @jsx React.DOM
 */
define(["React", "underscore"], function(React, _) {
    return {
        create: function(Model) {
            return React.createClass({  
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
                    return (
                        <fieldset className="fieldset input-holder">
                            <h2>Inputs</h2>
                            <div>
                                <label htmlFor="firstname">First Name:</label>
                                <input tabindex="1" type="text" className="input" id="firstname" placeholder="First name" />
                            </div>
                            <div>
                                <label htmlFor="age">Age:</label>
                                <input tabindex="2" type="text" className="input" id="age" placeholder="Age" />
                            </div>
                        </fieldset>
                    );
                }
            });
        }
    };
});