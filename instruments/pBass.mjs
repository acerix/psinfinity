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
    this.synth = new Tone.FMSynth().toMaster()

  }

  // Called with the top level object after it has been initialized
  init(root) {
var synth = this.synth
synth.triggerAttackRelease('C4', '4n', '8n')
synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
synth.triggerAttackRelease('G4', '16n', '2n')
synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t')*2)
synth.triggerAttackRelease('E4', '2n', '0:3')
  }

}
