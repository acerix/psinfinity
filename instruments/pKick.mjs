'set strict'

/** Psinfinity Kick Drum */

export class pKick {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

  }

  // Called with the top level object after it has been initialized
  init(root) {
    var player = new Tone.Player('../../sounds/kick.ogg').toMaster()
    player.autostart = true
  }

}
