﻿'set strict'

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
      source.start('+8n')
    }, '4n')

    // Randomly silence
    var measure = -1
    source.volume.value = -1024
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 8 !== 2) return
      if (Math.random() > 0.9) {
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
