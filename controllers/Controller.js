/* 
base controller class
justification for this is that both controllers require the 
createArgs method, so to make the code more DRY both controllers 
inherit from the base controller
*/

// maps query strings to error and success messages to be sent to views
const messages = require("../messages.json")

module.exports = class Controller {
  /**
   * Create an args object to be sent to the view
   * args is used to contain any dynamic data to be used in templates
   * @param {Object} req - HTTP request object
   * @return {Object} args - args to be sent to the view
   * Since the app sends dynamic error and success flash messages based on query string,
   * createArgs adds any messages from the url query string to the object
   * before returning it
   * If there are no success or error messages, returns an empty args object
   */
  createArgs = (req) => {
    const args = {}
    if (req.query.error) {
      args.message = messages.error[req.query.error]
    } else if (req.query.success) {
      args.message = messages.success[req.query.success]
    }
    return args
  }
}
