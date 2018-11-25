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
    this.source = new Tone.FMSynth().toMaster().sync()

    var sixteenth_note = Tone.Time('16n')

    // 0
    this.source.triggerAttackRelease('D2', sixteenth_note, 1 * sixteenth_note)
    this.source.triggerAttackRelease('F2', sixteenth_note, 2 * sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note, 3 * sixteenth_note)

    // 4
    this.source.triggerAttackRelease('F1', sixteenth_note, 5 * sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note, 6 * sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note, 7 * sixteenth_note)

    // 8
    this.source.triggerAttackRelease('D2', sixteenth_note, 9 * sixteenth_note)
    this.source.triggerAttackRelease('Ab1', sixteenth_note, 10 * sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note, 11 * sixteenth_note)

    // 12
    // 13
    this.source.triggerAttackRelease('D2', sixteenth_note, 14 * sixteenth_note)
    this.source.triggerAttackRelease('Ab1', sixteenth_note, 15 * sixteenth_note)

  }

  init(root) {
    console.log('pBass init()')
  }

}
