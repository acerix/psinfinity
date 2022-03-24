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
          burn: 'sounds/clips/burn.ogg',
          disintegrate: 'sounds/clips/disintegrate.ogg',
          dot: 'sounds/clips/dot.ogg',
          home: 'sounds/clips/home.ogg',
          snack: 'sounds/clips/snack.ogg',
          syrup: 'sounds/clips/syrup.ogg',
          vibration: 'sounds/clips/vibration.ogg',
        }
      }
    }

    // Default parameters
    this.params = options.hasOwnProperty('params') ? options.params : {}

    // Store a list of all clips
    this.clips = Object.keys(options.audio_urls)

    // Create Tone.js pan/vol
    this.destination = new Tone.PanVol(0, -2).toDestination()

    // Create Tone.js players
    //var players = new Tone.Players(options.audio_urls).chain(this.panvol, Tone.Master)

    // Tone.Players doesn't seem to work anymore so just use a plain dict
    this.players = {}
    for (const [k, v] of Object.entries(options.audio_urls)) {
      this.players[k] = new Tone.Player(v).connect(this.destination)
    }
    
    // Every 4 measures, randomly play
    Tone.Transport.scheduleRepeat(function(time){

      if (Math.random() > .95) {
        self.destination.set({pan: 2*Math.random()-1})
        const clip = self.getRandomClip()
        //players.get(clip).start()
        self.players[clip].start(time)
      }

    }, '1m')

  }

  getRandomClip() {
    return this.clips[ this.clips.length * Math.random() << 0 ]
  }

}
