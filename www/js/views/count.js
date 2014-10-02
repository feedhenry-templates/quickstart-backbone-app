/**
 * A Backbone View to handle accepting the user input and calling the "cloud" helper function to send the characters
 * to the cloud.
 * @type {*}
 */

App.View.CountView = Backbone.View.extend({
  el: "#count",
  events: {
    "click button.count-characters": "countCharacters"
  },
  initialize: function(){
    _.bindAll(this, "countCharacters");
  },
  countCharacters: function(){
    var self = this;

    //Finding the input text.
    var input = self.$el.find("input[type='text']");

    var characters = input.val();

    self.$el.find('.count-result').html("Calling Cloud Endpoint");
    self.$el.find('.count-result').removeClass("hidden");

    /**
     * Success function when the $fh.cloud call has completed successfully.
     *
     * @param response: JSON Object -> {strLength: <<Length of the string entered.>>}
     */
    function success(response){
      var stringLength = response.strLength;

      if(stringLength){
        self.$el.find('.count-result').html("You have entered " + stringLength + " characters.");
      }
    }

    /**
     * A function to handle an error caused by the $fh.cloud API.
     *
     * @param message: String -> Error message passed back by the cloud "count" endpoint.
     * @param error:  JSON Object ->
     */
    function error(message, error){
      self.$el.find('.count-result').html("An Error Occurred When Calling $fh.cloud: " + message + " " + JSON.stringify(error));
      self.$el.find('.count-result').addClass('text-danger');
    }

    if(characters){
      //Calling the "cloud" helper function to call the $fh.cloud endpoint.
      App.helpers.cloud("count", characters, success, error);
    }
  }
});


/**
 * Listening for the `fhinit` event triggered by the Feedhenry Javascript SDK before initialising the `Count` View.
 *
 * This event must have been triggered before using the $fh Client API functions.
 */
$fh.on('fhinit', function(){
  App.views.count = new App.View.CountView();
});

