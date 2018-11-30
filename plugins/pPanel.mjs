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

    // Table
    this.table = document.createElement('table')
    this.table.style.width = '100%'

    this.tbody = document.createElement('tbody')
    this.table.appendChild(this.tbody)


    // Random Seed

    var tr = document.createElement('tr')
    this.tbody.appendChild(tr)

    var td = document.createElement('td')
    td.style.width = '50px'
    td.style.textAlign = 'center'
    tr.appendChild(td)

    var refresh_link = document.createElement('a')
    refresh_link.textContent = '↻'
    refresh_link.href = './'
    td.appendChild(refresh_link)

    this.seed_display = document.createElement('td')
    this.seed_display.textContent = root.params.seed
    tr.appendChild(this.seed_display)



    // BPM Slider

    var tr = document.createElement('tr')
    this.tbody.appendChild(tr)

    this.bpm_display = document.createElement('td')
    this.bpm_display.style.textAlign = 'center'
    this.bpm_display.textContent = root.params.bpm
    tr.appendChild(this.bpm_display)

    var td = document.createElement('td')
    tr.appendChild(td)
    td.appendChild(this.render_bpm_slider(root))


    // Key Slider

    var tr = document.createElement('tr')
    this.tbody.appendChild(tr)

    this.key_display = document.createElement('td')
    this.key_display.style.textAlign = 'center'
    this.key_display.textContent = root.intToNoteName(root.key)
    tr.appendChild(this.key_display)

    var td = document.createElement('td')
    tr.appendChild(td)
    td.appendChild(this.render_key_slider(root))

    document.body.appendChild(this.table)

  }

  render_bpm_slider(root) {

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
      var bpm = parseInt(this.value, 10)
      Tone.Transport.bpm.value = bpm
      root.setParam('bpm', bpm)
    }
    return this.bpm_slider
  }

  render_key_slider(root) {

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
      root.key = parseInt(this.value, 10)
      root.setParam('key', root.intToNote(root.key))
    }
    return this.key_slider

  }

}
