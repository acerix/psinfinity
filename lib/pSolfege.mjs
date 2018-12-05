'set strict'

/** Psinfinity Solfege */

const number_of_notes = 12

const base_frequency = 55

const nth_root_of_two = Math.pow(2, 1/number_of_notes)

// Get the frequency for the note id (0..12) and octave
// Based on A440, ie. 4th octave A or getNoteFrequency(9, 4) === 440
export function getNoteFrequency(note_id=0, octave=4) {
  return base_frequency * Math.pow(nth_root_of_two, number_of_notes * octave + note_id - 21)
}

export class pSolfege {
}
