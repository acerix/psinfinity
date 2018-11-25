'set strict'

/** Psinfinity Kick Drum */

export class pKick {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_url: '../../sounds/kick.ogg',
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js player
    this.source = new Tone.Player(
      options.audio_url,
      function(player) {
        player.sync()
        player.start()
      }
    ).toMaster()

  }

  // Called with the top level object after it has been initialized
  init(root) {
    console.log('pKick init()')
  }

}
