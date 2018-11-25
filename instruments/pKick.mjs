'set strict'

/** Psinfinity Kick Drum */

export class pKick {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_url: 'sounds/kick.oggx',
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js player
    this.source = new Tone.Player(options.audio_url).toMaster()
    this.source.sync()
    this.source.start()
  }

  // Called with the top level object after it has been initialized
  init(root) {
    console.log('pKick init()')
  }

}
