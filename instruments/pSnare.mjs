'set strict'

/** Psinfinity Snare Drum */

export class pSnare {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_url: 'sounds/snare.ogg',
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js player
    var source = new Tone.Player(options.audio_url).toMaster()

    // Play on event 8th note
    Tone.Transport.scheduleRepeat(function(time){
      source.start('8n')
    }, '8n')

  }

  // Called with the top level object after it has been initialized
  init(root) {
    console.log('pSnare init()')
  }

}
