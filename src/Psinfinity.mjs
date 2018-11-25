'set strict'

/** Psinfinity */

export class Psinfinity {

  constructor(options) {

    var self = this

    // Plugins
    this.plugins = options.hasOwnProperty('plugins') ? options.plugins : {}

    // Instruments
    this.instruments = options.hasOwnProperty('instruments') ? options.instruments : {}

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {

      // Beats per minute
      bpm: 140,

    }

    // Override parameters from params plugin
    if (typeof this.plugins.params === 'object') {
      for (var i in this.plugins.params.params) if (i in this.params) {
        this.params[i] = this.plugins.params.params[i]
      }
    }

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
    Tone.Transport.loopEnd = '4n'
    Tone.Transport.bpm.value = this.params.bpm

    // Init instruments
    if (typeof this.instruments === 'object') {
      for (var i in this.instruments) if (typeof this.instruments[i].init === 'function') {
        this.instruments[i].init(this)
      }
    }

    // Start Tone.js transport when buffers are loaded
    Tone.Buffer.on('load', function(){
      Tone.Transport.start()
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

}

