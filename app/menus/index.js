const app = require('./items/app')
const file = require('./items/file')
const edit = require('./items/edit')
const gadget = require('./items/gadget')
const view = require('./items/view')
const window = require('./items/window')
const help = require('./items/help')

module.exports = function Menus () {
  return [
    app,
    file,
    edit,
    gadget,
    view,
    window,
    help
  ]
}
