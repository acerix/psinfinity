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

    // Play on most 16th notes
    var note = -1
    var skip_notes = false
    Tone.Transport.scheduleRepeat(function(time){
      note++
      if (skip_notes && note % 2 === 1) return
      source.start()
    }, '16n')

    // Randomly silence
    var measure = -1
    source.volume.value = -1024
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 4 !== 2) return
      skip_notes = Math.random() > 0.5
      if (Math.random() > 0.6) {
        source.volume.value = 0
      }
      else {
        source.volume.value = -1024
      }
    }, '1m')

  }

}
