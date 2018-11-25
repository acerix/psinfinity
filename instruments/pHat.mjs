'set strict'

/** Psinfinity Hat Drum */

export class pHat {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_url: 'sounds/hat.ogg',
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js player
    var source = new Tone.Player(options.audio_url).toMaster()

    // Play on event 16th note
    Tone.Transport.scheduleRepeat(function(time){
      source.start()
    }, '16n')

  }

  // Called with the top level object after it has been initialized
  init(root) {
    console.log('pHat init()')
  }

}
