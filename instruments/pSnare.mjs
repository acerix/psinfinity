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

    // Randomly silence
    var measure = -1
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 3 === 0) return
      if (Math.random() > 0.2) {
        source.volume.value = 0
      }
      else {
        source.volume.value = -1024
      }
    }, '1m')

  }

  init(root) {
    console.log('pSnare init()')
  }

}
