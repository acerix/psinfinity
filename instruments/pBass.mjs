﻿'set strict'

/** Psinfinity Bass Synth */

import {getNoteFrequency} from '../plugins/pSolfege.mjs'

export class pBass {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js synth
    this.source = new Tone.FMSynth().toMaster().sync()

    // Randomly silence
    var measure = -1
    this.source.volume.value = -1024
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 4 !== 0) return
      if (Math.random() > 0.05) {
        self.source.volume.value = 0
      }
      else {
        self.source.volume.value = -1024
      }
    }, '1m')

  }

  init(root) {
    console.log('pBass init()')

    var sixteenth_note = Tone.Time('16n')

    // 0
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 2), sixteenth_note, 1 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 3, 2), sixteenth_note, 2 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 2), sixteenth_note, 3 * sixteenth_note)

    // 4
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 2), sixteenth_note, 5 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 3, 2), sixteenth_note, 6 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 3, 2), sixteenth_note, 7 * sixteenth_note)

    // 8
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 2), sixteenth_note, 9 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key - 2, 2), sixteenth_note, 10 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 0), sixteenth_note, 11 * sixteenth_note)

    // 12
    // 13
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 2), sixteenth_note, 14 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key - 2, 2), sixteenth_note, 15 * sixteenth_note)

  }

}
