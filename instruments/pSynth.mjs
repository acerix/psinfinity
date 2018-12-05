'set strict'

/** Psinfinity Melody Synth */

import {getNoteFrequency} from '../lib/pSolfege.mjs'
import {pScales} from '../lib/pScales.mjs'

export class pSynth {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Randomly silence
    var measure = -1
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (Math.random() > 0.9) {
        self.source.volume.value = 0
      }
      else {
        self.source.volume.value = -1024
      }
    }, '1m')

  }

  init(root) {
    this.createSource(root)

    var scales = new pScales()
    var scale_name = scales.random_scale()
    this.notes = scales.note_positions(scale_name)

    console.log('Synth(' + scale_name + ')')
  }

  createSource(root) {

    if (typeof this.source === 'object') {
      this.source.dispose()
    }

    // Create Tone.js pan/vol
    this.panvol = new Tone.PanVol(Math.random() - 0.5, -16)

    // Create Tone.js synth
    this.source = new Tone.Synth({
      oscillator: {
        type: 'sawtooth'
      }
    })
      .chain(this.panvol, Tone.Master)
      .sync()

    var sixteenth_note = Tone.Time('16n')

    // The melody
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 4), sixteenth_note, 1 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 3, 4), sixteenth_note, 2 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 5, 4), sixteenth_note * 3 / 2, 3 * sixteenth_note)

    this.source.triggerAttackRelease(getNoteFrequency(root.key, 4), sixteenth_note, 9 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key - 2, 4), sixteenth_note * 2, 10 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key + 5, 4), sixteenth_note, 12 * sixteenth_note)
    this.source.triggerAttackRelease(getNoteFrequency(root.key, 4), sixteenth_note, 13 * sixteenth_note)

  }

}
