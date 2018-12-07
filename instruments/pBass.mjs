'set strict'

/** Psinfinity Bass Synth */

import {getNoteFrequency,getRelativeNoteFrequency} from '../lib/pSolfege.mjs'

export class pBass {

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
    this.createSource(root)
  }

  createSource(root) {

    if (typeof this.source === 'object') {
      this.source.dispose()
    }

    // Create Tone.js pan/vol
    this.panvol = new Tone.PanVol(Math.random() - 0.5, -8)

    // Create Tone.js synth
    this.source = new Tone.FMSynth()
      .chain(this.panvol, Tone.Master)
      .sync()


    // The bass line

    var sixteenth_note_time = Tone.Time('16n')

    var scale_note_offsets = root.pScales.scales[root.params.scale]

    // Convert 7 note scale to 5 notes
    if (scale_note_offsets.length === 6) {
      scale_note_offsets = root.pScales.septatonic_to_pentatonic(scale_note_offsets)
    }

    var scale_position = 0
    var current_note = getNoteFrequency(root.key)

    // For each 16th note
    for (var i=0; i<16; i++) {

      // Rest to make space for the kick
      if (i % 4 == 0) {
        continue
      }

      // Play the root note most of the time
      if (Math.random() > 0.4) {
        scale_position = 0
      }
      else {
        scale_position = root.rand(-5, 5)
      }

      current_note = getRelativeNoteFrequency(root.key, 2, scale_note_offsets, scale_position)

      this.source.triggerAttackRelease(
        current_note,
        sixteenth_note_time,
        i * sixteenth_note_time
      )
    }


  }

}
