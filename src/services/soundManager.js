/**
 * Sound manager — preloads the quiz sound effects and plays them on demand.
 *
 * Sounds are cloned on each play so the same effect can overlap with itself
 * (e.g. rapid clicks). Playback is a no-op while sound is disabled.
 */

const SOUND_PATHS = {
	correct: '/sounds/correct.wav',
	wrong: '/sounds/wrong.wav',
	warning: '/sounds/warning.wav',
	click: '/sounds/click.wav'
}

const VOLUME = 0.5

const sounds = new Map()
let enabled = false
let initialized = false

/** Preload the audio files once so playback has no startup delay. */
function initialize() {
	if (initialized) return

	Object.entries(SOUND_PATHS).forEach(([name, path]) => {
		const audio = new Audio(path)
		audio.preload = 'auto'
		sounds.set(name, audio)
	})

	initialized = true
}

/** Enable or disable all sound playback. Stops current sounds when disabling. */
function setEnabled(value) {
	enabled = value
	if (!value) stopAll()
}

/** Play a sound effect by name. Does nothing when sound is disabled. */
function play(soundName) {
	if (!enabled) return

	const sound = sounds.get(soundName)
	if (!sound) return

	const clone = sound.cloneNode()
	clone.volume = VOLUME
	clone.play().catch(() => {
		// Ignore autoplay/interaction errors — sound is non-essential.
	})
}

/** Stop and rewind all preloaded sounds. */
function stopAll() {
	sounds.forEach(sound => {
		sound.pause()
		sound.currentTime = 0
	})
}

export const soundManager = {
	initialize,
	setEnabled,
	play,
	stopAll
}
