/**
 * Helper function to allow access to the $fh.cloud Client API function from anywhere in the app.
 */

App.helpers.cloud = function(cloudEndpoint, userInput, successCb, errCb){

  /**
   * Sending a POST request to the cloudEndpoint.
   *
   * In this case, the cloudEndpoint is "count", but any cloud endpoint you have exposed can be accessed
   * using the $fh.cloud.
   *
   * @type {{path: string, type: string, contentType: string, data: {userInput: *}, timeout: number}}
   */
  var params = {
    path: cloudEndpoint,
    type: "GET",
    contentType: "application/json",
    payload: {userInput: userInput},
    timeout: 15000
  };

  $fh.cloud({
      path: cloudEndpoint,
      data: params
    },
    successCb,
    errCb
  );
}