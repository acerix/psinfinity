'set strict'

/** Psinfinity Kick Drum */

export class pKick {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_url: 'sounds/kick.ogg',
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js player
    var source = new Tone.Player(options.audio_url).toMaster()

    // Play on event 4th note
    Tone.Transport.scheduleRepeat(function(time){
      source.start()
    }, '4n')

  }

  init(root) {
    console.log('pKick init()')
  }

}
