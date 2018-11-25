'set strict'

/** Psinfinity Control Panel */

export class pPanel {

  constructor(options) {

    // Default options
    if (typeof options !== 'object') {
      options = {}
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

  }

  init(root) {
    console.log('pPanel init()')

    // Create bpm slider DOM element
    this.bpm_slider = document.createElement('input')
    this.bpm_slider.setAttribute('type', 'range')
    this.bpm_slider.setAttribute('step', 1)
    this.bpm_slider.setAttribute('min', 50)
    this.bpm_slider.setAttribute('max', 500)
    this.bpm_slider.setAttribute('value', Tone.Transport.bpm.value)
    this.bpm_slider.style.width = '100%'
    this.bpm_slider.onchange = function() {
      root.params.bpm = this.value
      Tone.Transport.bpm.value = root.params.bpm
      root.updateParams()
    }
    document.body.appendChild(this.bpm_slider)

  }

}
