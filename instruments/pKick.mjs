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

    // Randomly silence
    var measure = -1
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 4 !== 1) return
      if (Math.random() > 0.1) {
        source.volume.value = 0
      }
      else {
        source.volume.value = -1024
      }
    }, '1m')

  }

}
