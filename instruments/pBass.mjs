'set strict'

/** Psinfinity Bass Synth */

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
    var source = new Tone.FMSynth().toMaster().sync()

    var sixteenth_note = Tone.Time('16n')

    // 0
    source.triggerAttackRelease('D2', sixteenth_note, 1 * sixteenth_note)
    source.triggerAttackRelease('F2', sixteenth_note, 2 * sixteenth_note)
    source.triggerAttackRelease('D2', sixteenth_note, 3 * sixteenth_note)

    // 4
    source.triggerAttackRelease('F1', sixteenth_note, 5 * sixteenth_note)
    source.triggerAttackRelease('D2', sixteenth_note, 6 * sixteenth_note)
    source.triggerAttackRelease('D2', sixteenth_note, 7 * sixteenth_note)

    // 8
    source.triggerAttackRelease('D2', sixteenth_note, 9 * sixteenth_note)
    source.triggerAttackRelease('Ab1', sixteenth_note, 10 * sixteenth_note)
    source.triggerAttackRelease('D2', sixteenth_note, 11 * sixteenth_note)

    // 12
    // 13
    source.triggerAttackRelease('D2', sixteenth_note, 14 * sixteenth_note)
    source.triggerAttackRelease('Ab1', sixteenth_note, 15 * sixteenth_note)

    // Randomly silence
    var measure = -1
    source.volume.value = -1024
    Tone.Transport.scheduleRepeat(function(time){
      measure++
      if (measure % 4 !== 0) return
      if (Math.random() > 0.05) {
        source.volume.value = 0
      }
      else {
        source.volume.value = -1024
      }
    }, '1m')

  }

  init(root) {
    console.log('pBass init()')
  }

}
