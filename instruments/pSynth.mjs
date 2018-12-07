'set strict'

/** Psinfinity Melody Synth */

import {getNoteFrequency,getRelativeNoteFrequency} from '../lib/pSolfege.mjs'

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



    // The melody


    var sixteenth_note_time = Tone.Time('16n')

    var scale_note_offsets = root.pScales.scales[root.params.scale]

    var scale_position = 0
    var current_note = getNoteFrequency(root.key)

    var rest_freqency = 1 - Math.random() / 4
    var base_octave = root.rand(3, 5)

    // For each 16th note
    for (var i=0; i<16; i++) {

      // Rest sometimes
      if (Math.random() > rest_freqency) {
        continue
      }

      // Move this many notes down or up the scale
      scale_position += root.rand(-2, 2)

      current_note = getRelativeNoteFrequency(root.key, base_octave, scale_note_offsets, scale_position)

      this.source.triggerAttackRelease(
        current_note,
        sixteenth_note_time,
        i * sixteenth_note_time
      )
    }


  }

}
