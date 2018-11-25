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

    // Jump into main loop
    self.main(self)

  }

  // Main loop
  main(self) {

    var callback = function() {
      self.main(self)
    }

    // Draw
    self.console.innerHTML = Math.random()

    // Loop after vsync
    window.requestAnimationFrame(callback)

  }

  // Stores new params after manually changing
  updateParams() {
    if (typeof this.plugins.params === 'object') {
      this.plugins.params.update()
    }
  }

  // Convert y to screen basis from gl basis
  yToScreenBasis(y) {
    //return y + this.canvas.centre[1]
    return (y + this.canvas.centre[1]) / this.smallestScreenEdge() * this.params.sy
  }

}

