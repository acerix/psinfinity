'set strict'

/** Psinfinity Sound FX Player */

export class pFX {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_urls: {
          aeoh: 'sounds/fx/aeoh.ogg',
          eyeo: 'sounds/fx/eyeo.ogg',
          jeow: 'sounds/fx/jeow.ogg',
          zzzt: 'sounds/fx/zzzt.ogg',
        }
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Store a list of all FX
    this.FX = Object.keys(options.audio_urls)

    // Create Tone.js pan/vol
    this.panvol = new Tone.PanVol(Math.random() - 0.5, -16)

    // Create Tone.js players
    this.players = {}
    for (const [k, v] of Object.entries(options.audio_urls)) {
      this.players[k] = new Tone.Player(v).toDestination()
    }
    
    // Every 4 measures randomly play
    Tone.Transport.scheduleRepeat(function(time){

      if (Math.random() > 0.97) {
        const clip = self.getRandomClip()
        self.players[clip].start()
      }

    }, '1m')

  }

  getRandomClip() {
    return this.FX[ this.FX.length * Math.random() << 0 ]
  }

}
