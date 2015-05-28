/**
 * @jsx React.DOM
 */

require(["../main"], function() {
    "use strict";

    // TODO: treat the model right, it's not a module
    require(["React", "Flux", "jquery", "MicroEvent", "underscore", "modules/ButtonFactory", 
            "modules/FeedbackFactory", "modules/Validator", "modules/ResultsFactory", "modules/InputFactory", "modules/Model"], 
            function(React, Flux, $, MicroEvt, _, ButtonFactory, FeedbackFactory, Validator, ResultsFactory, InputFactory, Model) {
        
        // set up eventing for flux flow
        var AppDispatcher = new Flux.Dispatcher();
        MicroEvt.mixin(Model);
 
        // event handling happens in the switch here
        AppDispatcher.register( function( e ) {
            switch( e.type ) {
                case 'submit':
                    var fname = $('#firstname').val();
                    var age = $('#age').val();
                    var fnErrors = Validator.errors(fname, 'First name', Validator.NOT_EMPTY);
                    var ageErrors = Validator.errors(age, 'Age', Validator.NOT_EMPTY | Validator.IS_NUMBER);
                    if(fnErrors.length > 0 || ageErrors.length > 0) {
                        Model.feedback.isError = true;
                        Model.feedback.message = fnErrors.concat(ageErrors).join(' ');
                    }else{
                        Model.feedback.isNeutral = false;
                        Model.feedback.isError = false;
                        Model.feedback.message = "Welcome " + fname;
                        Model.add({firstname:fname, age:Number(age)});
                    }
                    Model.change();
                    // force the screen reader to read an alert element by showing it from hide state
                    $('#feedback').hide().show();
                    break;  
                case 'sort':
                    Model.sort().change();
                    break;
            }
            return true; // Needed for Flux promise resolution
        }); 
        
        // create components from modules and then compose / inject the view
        var Feedback = FeedbackFactory.create(Model);
        // TODO: passing AppDispatcher when we have a module loader?!
        // Who likes the factory pattern then? I do!
        var SubmitButton = ButtonFactory.create('Submit', 'submit', AppDispatcher);
        var SortButton = ButtonFactory.create('Sort', 'sort', AppDispatcher);
        var Input = InputFactory.create(Model);
        var Results = ResultsFactory.create(Model);

        React.renderComponent(
            <div>
                <h2>Please enter your first name and age</h2>
                <Feedback/>
            </div>,
          document.getElementById('feedback')
        );
        React.renderComponent(
            <div>
                <Input/>
                <SubmitButton tabindex="0" />
            </div>,
            document.getElementById('input')
        );
        React.renderComponent(
            <div>
                <Results/>
                <SortButton tabindex="0" />
            </div>,
            document.getElementById('results')
        );
    });
});
