// Web Audio API ambient trattoria & hearth sound generator
// Synthesizes a warm fireplace crackle and gentle acoustic room hum without external media files

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private crackleInterval: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.28, this.ctx.currentTime + 1.5);
    this.masterGain.connect(this.ctx.destination);

    // Warm hearth hum (brown noise simulation)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm fireplace tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.masterGain);
    whiteNoise.start();

    // Random delicate wood embers crackle
    this.crackleInterval = window.setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      if (Math.random() > 0.4) {
        this.triggerWoodPop();
      }
    }, 450);
  }

  private triggerWoodPop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();
      
      const freq = 120 + Math.random() * 320;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.type = 'triangle';

      const now = this.ctx.currentTime;
      popGain.gain.setValueAtTime(0.001, now);
      popGain.gain.exponentialRampToValueAtTime(0.12 * Math.random(), now + 0.01);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06 + Math.random() * 0.08);

      osc.connect(popGain);
      popGain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio node cleanup
    }
  }

  private stop() {
    if (this.crackleInterval) {
      clearInterval(this.crackleInterval);
      this.crackleInterval = null;
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
