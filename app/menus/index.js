import app from './items/app'
import file from './items/file'
import edit from './items/edit'
import gadget from './items/gadget'
import view from './items/view'
import window from './items/window'
import help from './items/help'

export default function configureMenu () {
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
