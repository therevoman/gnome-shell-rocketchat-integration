
const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Shell = imports.gi.Shell;
const app = Shell.AppSystem.get_default().lookup_app("rocketchat.desktop");

let text, button;

function _showRocketChat() {
  if(app == null) {
    throw new Error("Could not find RocketChat! Make sure that the Desktop entry file 'rocketchat.desktop' is available.");
  }

  if (app.get_state() == 0) {
    Util.spawn(['/opt/Rocket.Chat+/rocketchat']);
  } 
}

function init() {
  button = new St.Bin({ style_class: 'panel-button',
			reactive: true,
			can_focus: true,
			x_fill: true,
			y_fill: false,
			track_hover: true });

  let icon = new St.Icon({ icon_name: 'rocketchat',
			   icon_size: 25 });

  button.set_child(icon);
  button.connect('button-press-event', _showRocketChat);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
