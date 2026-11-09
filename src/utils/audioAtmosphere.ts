/**
 * Web Audio API Engine — Historic Italian Trattoria Atmosphere
 * Synthesizes an authentic, romantic vintage Italian acoustic melody:
 * - Nylon-string classical guitar fingerpicking in classic Neapolitan 3/4 waltz rhythm
 * - Traditional Italian mandolin with warm double-string tremolo and ringing sustain
 * - Subtle vintage vinyl warmth and room acoustics
 * Zero external audio files required — 100% reliable, zero CORS, instant playback.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private loopTimeout: number | null = null;
  private tempo = 108; // Classic Italian tempo

  public init() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    this.init();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);

    // Warm vintage vinyl & trattoria ambient room tone
    this.startVintageAtmosphere();

    // Start playing the romantic historic Italian melody
    this.playSongLoop();
  }

  /**
   * Plucks a warm classical nylon guitar string with natural body resonance
   */
  private playGuitarPluck(freq: number, time: number, volume = 0.22, duration = 1.4) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Nylon string warmth (triangle + subtle lowpass)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, time + duration);

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Plucks an Italian mandolin string (double-course detuned strings for authentic chorus)
   */
  private playMandolinNote(freq: number, time: number, volume = 0.24, duration = 0.9, isTremolo = false) {
    if (!this.ctx || !this.masterGain) return;

    if (isTremolo) {
      // Mandolin tremolo effect: 3 rapid light plucks
      for (let t = 0; t < 3; t++) {
        this.playMandolinNote(freq, time + (t * 0.075), volume * 0.85, 0.45, false);
      }
      return;
    }

    // Italian mandolins use paired double strings (courses) tuned in unison with a micro-detune
    const detunes = [-3, 3];
    detunes.forEach((cents) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Mandolin bright, sweet timbre (filtered saw/triangle blend)
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      osc.detune.setValueAtTime(cents, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 4.5, time);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.8, time + duration);
      filter.Q.setValueAtTime(1.5, time);

      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(volume * 0.5, time + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  /**
   * Historic Italian Canzone & Trattoria Melody Loop
   * Traditional 3/4 Italian waltz progression (Am - Dm - E7 - Am)
   */
  private playSongLoop() {
    if (!this.ctx || !this.isPlaying) return;

    const beat = 60 / this.tempo; // Duration of one beat in seconds (~0.55s)
    const startTime = this.ctx.currentTime + 0.1;

    // Frequencies (Hz)
    const notes = {
      // Guitar Bass / Chords
      A2: 110.00, C3: 130.81, E3: 164.81, A3: 220.00,
      D3: 146.83, F3: 174.61, D4: 293.66,
      E2: 82.41,  Gs2: 103.83, B2: 123.47, E4: 329.63,
      G3: 196.00, B3: 246.94, C4: 261.63,

      // Mandolin Melody
      E4_m: 329.63, F4_m: 349.23, G4_m: 392.00,
      A4_m: 440.00, B4_m: 493.88, C5_m: 523.25,
      D5_m: 587.33, E5_m: 659.25, Gs4_m: 415.30,
    };

    // 16-measure historic Italian theme in 3/4 time
    // Measures 1-4: Am
    // Measures 5-8: Dm
    // Measures 9-12: E7
    // Measures 13-16: Am resolution

    const chords: Array<{ bass: number; mid1: number; mid2: number }> = [
      // 1-4: Am
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      // 5-8: Dm
      { bass: notes.D3, mid1: notes.F3, mid2: notes.A3 },
      { bass: notes.D3, mid1: notes.F3, mid2: notes.A3 },
      { bass: notes.D3, mid1: notes.F3, mid2: notes.A3 },
      { bass: notes.D3, mid1: notes.F3, mid2: notes.A3 },
      // 9-12: E7
      { bass: notes.E2, mid1: notes.Gs2, mid2: notes.B2 },
      { bass: notes.E2, mid1: notes.Gs2, mid2: notes.B2 },
      { bass: notes.E2, mid1: notes.Gs2, mid2: notes.B2 },
      { bass: notes.E2, mid1: notes.Gs2, mid2: notes.B2 },
      // 13-16: Am
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
      { bass: notes.A2, mid1: notes.C3, mid2: notes.E3 },
    ];

    // Schedule Classical Guitar Waltz Accompaniment (Bass on beat 1, chords on beats 2 & 3)
    chords.forEach((chord, barIdx) => {
      const barTime = startTime + (barIdx * 3 * beat);
      // Beat 1: Bass note
      this.playGuitarPluck(chord.bass, barTime, 0.28, 1.8);
      // Beat 2: Mid strings
      this.playGuitarPluck(chord.mid1, barTime + beat, 0.16, 1.0);
      this.playGuitarPluck(chord.mid2, barTime + beat + 0.015, 0.16, 1.0);
      // Beat 3: Mid strings
      this.playGuitarPluck(chord.mid1, barTime + (2 * beat), 0.15, 1.0);
      this.playGuitarPluck(chord.mid2, barTime + (2 * beat) + 0.015, 0.15, 1.0);
    });

    // Schedule Romantic Italian Mandolin Melody
    const melody: Array<{ note: number; bar: number; beatOffset: number; tremolo?: boolean; dur?: number }> = [
      // Measure 1-2: Opening motif
      { note: notes.E4_m, bar: 0, beatOffset: 0, dur: 1.2 },
      { note: notes.A4_m, bar: 0, beatOffset: 2, dur: 0.8 },
      { note: notes.B4_m, bar: 1, beatOffset: 0, dur: 0.8 },
      { note: notes.C5_m, bar: 1, beatOffset: 1, tremolo: true, dur: 1.5 },

      // Measure 3-4: Lyrical turn
      { note: notes.B4_m, bar: 2, beatOffset: 0, dur: 0.7 },
      { note: notes.A4_m, bar: 2, beatOffset: 1, dur: 0.7 },
      { note: notes.Gs4_m, bar: 2, beatOffset: 2, dur: 0.7 },
      { note: notes.A4_m, bar: 3, beatOffset: 0, tremolo: true, dur: 2.0 },

      // Measure 5-6: Dm longing passage
      { note: notes.D5_m, bar: 4, beatOffset: 0, tremolo: true, dur: 1.5 },
      { note: notes.F4_m, bar: 4, beatOffset: 2, dur: 0.8 },
      { note: notes.A4_m, bar: 5, beatOffset: 0, dur: 0.8 },
      { note: notes.D5_m, bar: 5, beatOffset: 1, tremolo: true, dur: 1.5 },

      // Measure 7-8: Descending cascade
      { note: notes.C5_m, bar: 6, beatOffset: 0, dur: 0.8 },
      { note: notes.B4_m, bar: 6, beatOffset: 1, dur: 0.8 },
      { note: notes.A4_m, bar: 6, beatOffset: 2, dur: 0.8 },
      { note: notes.Gs4_m, bar: 7, beatOffset: 0, tremolo: true, dur: 2.2 },

      // Measure 9-10: E7 resolution climb
      { note: notes.B4_m, bar: 8, beatOffset: 0, dur: 1.0 },
      { note: notes.C5_m, bar: 8, beatOffset: 2, dur: 0.8 },
      { note: notes.D5_m, bar: 9, beatOffset: 0, tremolo: true, dur: 1.5 },
      { note: notes.E5_m, bar: 9, beatOffset: 2, dur: 0.8 },

      // Measure 11-12: High emotional peak
      { note: notes.C5_m, bar: 10, beatOffset: 0, tremolo: true, dur: 1.4 },
      { note: notes.B4_m, bar: 10, beatOffset: 2, dur: 0.8 },
      { note: notes.A4_m, bar: 11, beatOffset: 0, dur: 1.0 },
      { note: notes.Gs4_m, bar: 11, beatOffset: 1.5, dur: 1.0 },

      // Measure 13-16: Final Italian cadence & flourish
      { note: notes.A4_m, bar: 12, beatOffset: 0, tremolo: true, dur: 2.4 },
      { note: notes.C5_m, bar: 13, beatOffset: 1, dur: 0.8 },
      { note: notes.B4_m, bar: 13, beatOffset: 2, dur: 0.8 },
      { note: notes.A4_m, bar: 14, beatOffset: 0, tremolo: true, dur: 3.5 },
    ];

    melody.forEach((item) => {
      const noteTime = startTime + (item.bar * 3 * beat) + (item.beatOffset * beat);
      this.playMandolinNote(
        item.note,
        noteTime,
        0.28,
        item.dur ?? 1.0,
        !!item.tremolo
      );
    });

    // Total length of loop: 16 bars * 3 beats * beatDuration
    const totalDuration = 16 * 3 * beat;

    // Loop back seamlessly with natural musical breath
    this.loopTimeout = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playSongLoop();
      }
    }, totalDuration * 1000);
  }

  /**
   * Warm vintage vinyl & ambient Italian room resonance
   */
  private startVintageAtmosphere() {
    if (!this.ctx || !this.masterGain) return;

    // Soft warm room tone
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.015 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 1.2;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start();
  }

  private stop() {
    if (this.loopTimeout) {
      clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.isPlaying = false;
      }, 800);
    } else {
      this.isPlaying = false;
    }
  }
}

export const soundEngine = new SoundEngine();
