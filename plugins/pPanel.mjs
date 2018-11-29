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

    // Create bpm slider DOM element
    this.bpm_slider = document.createElement('input')
    this.bpm_slider.setAttribute('type', 'range')
    this.bpm_slider.setAttribute('step', 1)
    this.bpm_slider.setAttribute('min', 50)
    this.bpm_slider.setAttribute('max', 500)
    this.bpm_slider.setAttribute('value', root.params.bpm)
    this.bpm_slider.style.width = '100%'
    this.bpm_slider.style.margin = '0'
    this.bpm_slider.oninput =
    this.bpm_slider.onchange = function() {
      root.params.bpm = this.value
      Tone.Transport.bpm.value = root.params.bpm
      root.updateParams()
    }
    document.body.appendChild(this.bpm_slider)

    // Create key slider DOM element
    this.key_slider = document.createElement('input')
    this.key_slider.setAttribute('type', 'range')
    this.key_slider.setAttribute('step', 1)
    this.key_slider.setAttribute('min', 0)
    this.key_slider.setAttribute('max', 11)
    this.key_slider.setAttribute('value', root.key)
    this.key_slider.style.width = '100%'
    this.key_slider.style.margin = '0'
    this.key_slider.oninput =
    this.key_slider.onchange = function() {
      root.key = this.value
      root.params.key = root.intToNote(root.key)
      root.updateParams()
    }
    document.body.appendChild(this.key_slider)

  }

}
