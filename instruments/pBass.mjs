'set strict'

/** Psinfinity Bass */

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
    this.source.triggerAttackRelease('D2', sixteenth_note * 4 / 5, sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note * 3 / 4, 2 * sixteenth_note)
    this.source.triggerAttackRelease('D2', sixteenth_note * 2 / 3, 3 * sixteenth_note)

  }

  // Called with the top level object after it has been initialized
  init(root) {
    console.log('pBass init()')
  }

}
