'set strict'

/** Psinfinity Melody Synth */

export class pSynth {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Create Tone.js synth
    var source = new Tone.Synth({
      oscillator: {
        type: 'sawtooth'
      }
    }).toMaster().sync()

    // Start silent
    source.volume.value = -9999

    var sixteenth_note = Tone.Time('16n')

    // The melody
    source.triggerAttackRelease('D4', sixteenth_note, 1 * sixteenth_note)
    source.triggerAttackRelease('Ab4', sixteenth_note, 2 * sixteenth_note)
    source.triggerAttackRelease('F5', sixteenth_note * 3 / 2, 3 * sixteenth_note)

    source.triggerAttackRelease('D4', sixteenth_note, 9 * sixteenth_note)
    source.triggerAttackRelease('Ab5', sixteenth_note * 2, 10 * sixteenth_note)
    source.triggerAttackRelease('D4', sixteenth_note, 12 * sixteenth_note)
    source.triggerAttackRelease('F4', sixteenth_note, 13 * sixteenth_note)

    // Every measure randomly play
    Tone.Transport.scheduleRepeat(function(time){

      if (Math.random() > 0.9) {
        source.volume.value = Math.round(Math.random() * 4)
      }
      else {
        source.volume.value = -1024
      }

    }, '1m')

  }

  init(root) {
    console.log('pSynth init()')
  }

}
