'set strict'

/** Psinfinity */

import {pScales} from '../lib/pScales.mjs'

const __Psinfinity_version__ = '0.0.3'

export class Psinfinity {

  constructor(options) {

    var self = this

    // console.log('%c * Psinfinity v' + __Psinfinity_version__ + ' * ', 'background: #000; color: #fff;')

    // Plugins
    this.plugins = options.hasOwnProperty('plugins') ? options.plugins : {}

    // Instruments
    this.instruments = options.hasOwnProperty('instruments') ? options.instruments : {}

    // Scales
    this.pScales = new pScales()

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {

      // Beats per minute
      bpm: self.rand(120, 160), // 80..230?

      // Key: a,A,b,B,C,d,D,e,E,F,g,G
      key: self.intToNote(self.rand(0, 12)),

      // Scale: major, minor, etc
      scale: this.pScales.random_scale(),

      // Random seed
      seed: btoa(Math.seedrandom()).substring(0, 2),

    }

    // Override parameters from params plugin
    if (typeof this.plugins.params === 'object') {
      for (var i in this.plugins.params.params) if (i in this.params) {
        this.params[i] = this.plugins.params.params[i]
      }
    }

    // Seed the random number generator
    this.prng = new alea(this.params.seed)

    // @todo each instrument should get the seed and seed it's own prng for consistency, leave random() alone!
    Math.random = this.prng

    // Key (integer)
    this.key = self.noteToInt(this.params.key)

    // Fix invalid key
    this.params.key = self.intToNote(this.key)
    this.updateParams()

    // Create console DOM element
    this.console = document.createElement('p')
    document.body.appendChild(this.console)

    // Init plugins
    if (typeof this.plugins === 'object') {
      for (var i in this.plugins) if (typeof this.plugins[i].init === 'function') {
        this.plugins[i].init(this)
      }
    }

    // Start drawing loop
    setTimeout(this.drawLoop.bind(this))

    // Init Tone.js transport
    Tone.Transport.loop = true
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.bpm.value = this.params.bpm

  }

  // Start playback, in Chrome this is only allowed after a user interaction
  play() {

    // Init instruments
    if (typeof this.instruments === 'object') {
      for (var i in this.instruments) if (typeof this.instruments[i].init === 'function') {
        this.instruments[i].init(this)
      }
    }

    // Start Tone.js transport when buffers are loaded
    Tone.loaded().then(() => {
      Tone.Transport.start('2n')
    })

  }

  // Main drawing loop
  drawLoop() {

    // Draw frame
    this.drawFrame()

    // Loop after vsync
    window.requestAnimationFrame(this.drawLoop.bind(this))

  }

  // Draw frame
  drawFrame() {
    //this.console.textContent = Date.now()
    this.console.textContent = Tone.Transport.position
  }

  // Update params after changing them
  updateParams() {
    if (typeof this.plugins.params === 'object') {
      this.plugins.params.update()
    }
  }

  // Update one param after changing it
  setParam(param_id, new_value) {
    if (typeof this.plugins.params === 'object') {
      this.plugins.params.set(param_id, new_value)
    }
  }

  // Get a random integer
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Return an index of note name chars
  getNoteNameChars() {
    return 'AbBCdDeEFgGa'.split('')
  }

  // Convert a note name char to an integer
  noteToInt(note_name) {
    var note_name_chars = this.getNoteNameChars()
    for (var i in note_name_chars) {
      if (note_name_chars[i] === note_name) {
        return +i
      }
    }
    return 0
  }

  // Convert an integer (0..12) to the note name char
  intToNote(i) {
    var note_name_chars = this.getNoteNameChars()
    if (i in note_name_chars) {
      return note_name_chars[i]
    }
    return 'A'
  }

  // Return an index of note names
  getNoteNames() {
    return 'A,A♯/B♭,B,C,C♯/D♭,D,D♯/E♭,E,F,F♯/G♭,G,G♯/A♭'.split(',')
  }

  // Convert an integer (0..12) to the note name
  intToNoteName(i) {
    var note_name_chars = this.getNoteNames()
    if (i in note_name_chars) {
      return note_name_chars[i]
    }
  }

}
