'set strict'

/** Psinfinity Sound Clips Player */

export class pClips {

  constructor(options) {

    var self = this

    // Default options
    if (typeof options !== 'object') {
      options = {
        audio_urls: {
          countdown: 'sounds/clips/countdown.ogg',
          energy: 'sounds/clips/energy.ogg',
          galaxies: 'sounds/clips/galaxies.ogg',
          time: 'sounds/clips/time.ogg',
          wine: 'sounds/clips/wine.ogg',
        }
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Store a list of all clips
    this.clips = Object.keys(options.audio_urls)

    // Create Tone.js player
    var sources = new Tone.Players(options.audio_urls).toMaster()

    // Every 4 measures randomly play
    Tone.Transport.scheduleRepeat(function(time){

      if (Math.random() > 0.9) {
        sources.get( self.getRandomClip() ).start()
      }

    }, '1m')

  }

  init(root) {
    console.log('pClips init()')
  }

  getRandomClip() {
    return this.clips[ this.clips.length * Math.random() << 0 ]
  }

}
