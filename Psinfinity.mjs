'set strict'

/** Psinfinity */

export class Psinfinity {

  constructor(options) {

    var self = this

    // Plugins
    this.plugins = options.hasOwnProperty('plugins') ? options.plugins : {}

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


    // Create a Tone.js synth
    // Tone.js test
    var synth = new Tone.AMSynth().toMaster()
    document.querySelectorAll('button').forEach(function(button){
      button.addEventListener('mousedown', function(e){
        synth.triggerAttack(e.target.textContent)
      })
      button.addEventListener('mouseup', function(e){
        synth.triggerRelease()
      })
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
    this.console.innerHTML = Math.random()
  }

  // Update params after changing them
  updateParams() {
    if (typeof this.plugins.params === 'object') {
      this.plugins.params.update()
    }
  }

}

