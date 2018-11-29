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

    // Create Tone.js player
    var sources = new Tone.Players(options.audio_urls).toMaster()

    // Every 4 measures randomly play
    Tone.Transport.scheduleRepeat(function(time){

      if (Math.random() > 0.99) {
        sources.get( self.getRandomClip() ).start()
      }

    }, '1m')

  }

  init(root) {
    console.log('pFX init()')
  }

  getRandomClip() {
    return this.FX[ this.FX.length * Math.random() << 0 ]
  }

}
