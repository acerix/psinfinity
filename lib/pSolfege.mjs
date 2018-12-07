'set strict'

/** Psinfinity Solfege */

const number_of_notes = 12

const base_frequency = 55

const nth_root_of_two = Math.pow(2, 1/number_of_notes)

// Get the frequency for the note id (0..12) and octave
// Based on A440, ie. 4th octave A or getNoteFrequency(9, 4) === 440
export function getNoteFrequency(note_id=0, octave_id=4) {
  return base_frequency * Math.pow(nth_root_of_two, number_of_notes * octave_id + note_id - 21)
}

// Get the frequency for the root note id (0..12), root octave, scale note offsets, and position in scale
export function getRelativeNoteFrequency(note_id=0, octave_id=4, scale_note_offsets, scale_position) {

  if (scale_position === 0) {
    return getNoteFrequency(note_id, octave_id)
  }

  var note_index = scale_note_offsets.length % scale_position - 1

  // Root note is -1 since it's not included in note offsets
  if (note_index === -1) {
    var note_offset = 0
  }
  else {
    var note_offset = scale_note_offsets[note_index]
  }

  var octave_offset = scale_position / (scale_note_offsets.length + 1)
  octave_offset = octave_offset > 0 ? Math.floor(octave_offset) : Math.ceil(octave_offset)

  return getNoteFrequency(note_id + note_offset, octave_id + octave_offset)
}


export class pSolfege {
}
