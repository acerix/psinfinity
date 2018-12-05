'set strict'

/** Psinfinity Scales */

export class pScales {

  constructor(options) {

    this.scales = {

      // Octave: The only note is the root note
      octave: [],

      // Chromatic: Every note
      chromatic: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

      // Western modes
      ionian: [2, 2, 1, 2, 2, 2],
      dorian: [2, 1, 2, 2, 2, 1],
      phrygian: [1, 2, 2, 2, 1, 2],
      lydian: [2, 2, 2, 1, 2, 2],
      mixolydian: [2, 2, 1, 2, 2, 1],
      aeolian: [2, 1, 2, 2, 1, 2],
      locrian: [1, 2, 2, 1, 2, 2],

      // Extra
      minor_harmonic: [2, 1, 2, 2, 1, 3],
      minor_melodic_ascending: [2, 1, 2, 2, 2, 2],
      minor_melodic_descending: [2, 1, 2, 2, 1, 2],
      blues: [3, 2, 1, 1, 3],

      // Random
      wicked: [1, 3, 1, 2, 1, 2],

    }

    // Scales based on previous definitions

    // Aliases
    this.scales.major = this.scales.ionian
    this.scales.minor_natural = this.scales.aeolian

    // Pentatonic
    this.scales.major_pentatonic = this.septatonic_to_pentatonic(this.scales.major)
    this.scales.minor_pentatonic = this.septatonic_to_pentatonic(this.scales.minor_natural)

  }

  // Convert a septatonic scale to the corresponding pentatonic scale
  septatonic_to_pentatonic(s) {
    return [ s[0], s[2], s[3], s[4] ]
  }

  // Return a list of the notes in the scale besides the root
  note_positions(scale_name) {
    var notes = []
    var intervals = this.scales[scale_name]
    for (var i in intervals) {
      if (notes.length === 0) {
        notes.push(intervals[i])
      }
      else {
        notes.push(notes[notes.length - 1] + intervals[i])
      }
    }
    return notes
  }

  // Return a random scale
  random_scale() {
    var scale_names = Object.keys(this.scales)
    return scale_names[ scale_names.length * Math.random() << 0]
  }

}
