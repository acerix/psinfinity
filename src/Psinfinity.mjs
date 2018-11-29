'set strict'

/** Psinfinity */

const __Psinfinity_version__ = '0.0.1'

export class Psinfinity {

  constructor(options) {

    var self = this

    console.log('%c * Psinfinity v' + __Psinfinity_version__ + ' * ', 'background: #000; color: #fff;')

    // Plugins
    this.plugins = options.hasOwnProperty('plugins') ? options.plugins : {}

    // Instruments
    this.instruments = options.hasOwnProperty('instruments') ? options.instruments : {}

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {

      // Beats per minute
      bpm: self.rand(80, 230),

      // Key: C,d,D,e,E,F,g,G,a,A,b,B
      key: self.intToNote(self.rand(0, 12)),

      // Random seed
      seed: btoa(Math.seedrandom()).substr(0, 12),

    }

    // Override parameters from params plugin
    if (typeof this.plugins.params === 'object') {
      for (var i in this.plugins.params.params) if (i in this.params) {
        this.params[i] = this.plugins.params.params[i]
      }
    }

    // Seed the random number generator
    this.prng = new alea(this.params.seed)

    // @todo each instrument should get the seed and seed it's own prng for consistency
    Math.random = this.prng

    // Key (integer)
    this.key = self.noteToInt(this.params.key)
    this.params.key = self.intToNote(this.key)

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

    // Init instruments
    if (typeof this.instruments === 'object') {
      for (var i in this.instruments) if (typeof this.instruments[i].init === 'function') {
        this.instruments[i].init(this)
      }
    }

    // Start Tone.js transport when buffers are loaded
    Tone.Buffer.on('load', function(){
      // Wait a bit to prevent all sounds playing at once
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

  // Get a random integer
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Return an index of note names ()
  getNoteNameChars() {
    return 'CdDeEFgGaAbB'.split('')
  }

  // Convert a note name char to an integer
  noteToInt(note_name) {
    var note_name_chars = this.getNoteNameChars()
    for (var i in note_name_chars) {
      if (note_name_chars[i] === note_name) {
        return i
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
    return 'C'
  }

}
