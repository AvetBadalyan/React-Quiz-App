/**
 * Sound Manager Service
 *
 * Manages audio playback for the quiz application with support for:
 * - Preloading sound files
 * - Enable/disable functionality
 * - Priority-based playback (answer sounds > warning sounds)
 *
 * Validates: Requirements 10.1, 10.7, 10.8, 10.9
 */

// Sound priority levels (higher number = higher priority)
const PRIORITY_LEVELS = {
	low: 1,
	normal: 2,
	high: 3
}

// Sound configuration with paths and default priorities
const SOUND_CONFIG = {
	correct: { path: '/sounds/correct.mp3', defaultPriority: 'high' },
	wrong: { path: '/sounds/wrong.mp3', defaultPriority: 'high' },
	warning: { path: '/sounds/warning.mp3', defaultPriority: 'normal' },
	click: { path: '/sounds/click.mp3', defaultPriority: 'low' }
}

// Module-level state (closure-based instead of class)
const sounds = new Map()
let enabled = false
let currentlyPlaying = null
let currentPriority = 0
let initialized = false

/**
 * Preload all sound files
 * Requirement 10.7: Sound_Manager SHALL preload sound effect files to prevent playback delay
 * @returns {Promise<void>}
 */
async function initialize() {
	if (initialized) {
		return
	}

	const loadPromises = Object.entries(SOUND_CONFIG).map(
		async ([name, config]) => {
			try {
				const audio = new Audio(config.path)
				audio.preload = 'auto'

				await new Promise((resolve) => {
					const handleCanPlay = () => {
						audio.removeEventListener('canplaythrough', handleCanPlay)
						audio.removeEventListener('error', handleError)
						resolve()
					}

					const handleError = (error) => {
						audio.removeEventListener('canplaythrough', handleCanPlay)
						audio.removeEventListener('error', handleError)
						console.warn(`Failed to load sound: ${name}`, error)
						resolve()
					}

					audio.addEventListener('canplaythrough', handleCanPlay)
					audio.addEventListener('error', handleError)
					audio.load()
				})

				sounds.set(name, audio)
			} catch (error) {
				console.warn(`Failed to initialize sound: ${name}`, error)
			}
		}
	)

	await Promise.all(loadPromises)
	initialized = true
}

/**
 * Enable or disable sound effects
 * @param {boolean} value - Whether sounds should be enabled
 */
function setEnabled(value) {
	enabled = value
	if (!value) {
		stopAll()
	}
}

/**
 * Play a sound with priority handling
 * @param {string} soundName - Name of the sound to play
 * @param {'high'|'normal'|'low'} [priority='normal'] - Priority level
 */
function play(soundName, priority = 'normal') {
	if (!enabled) {
		return
	}

	const sound = sounds.get(soundName)
	if (!sound) {
		console.warn(`Sound not found: ${soundName}`)
		return
	}

	const priorityLevel = PRIORITY_LEVELS[priority] || PRIORITY_LEVELS.normal

	if (priority === 'high') {
		stopAll()
	} else if (currentPriority >= priorityLevel && currentlyPlaying) {
		return
	}

	const audioClone = sound.cloneNode()
	audioClone.volume = 0.5

	currentlyPlaying = soundName
	currentPriority = priorityLevel

	audioClone.addEventListener(
		'ended',
		() => {
			if (currentlyPlaying === soundName) {
				currentlyPlaying = null
				currentPriority = 0
			}
		},
		{ once: true }
	)

	audioClone.play().catch((error) => {
		console.warn(`Failed to play sound: ${soundName}`, error)
		if (currentlyPlaying === soundName) {
			currentlyPlaying = null
			currentPriority = 0
		}
	})
}

/**
 * Stop all currently playing sounds and reset
 */
function stopAll() {
	sounds.forEach((sound) => {
		sound.pause()
		sound.currentTime = 0
	})
	currentlyPlaying = null
	currentPriority = 0
}

/**
 * Check if a specific sound is loaded
 * @param {string} soundName - Name of the sound to check
 * @returns {boolean}
 */
function isLoaded(soundName) {
	return sounds.has(soundName)
}

/**
 * Check if sounds are currently enabled
 * @returns {boolean}
 */
function isEnabled() {
	return enabled
}

/**
 * Check if the manager has been initialized
 * @returns {boolean}
 */
function isInitialized() {
	return initialized
}

export const soundManager = {
	initialize,
	setEnabled,
	play,
	stopAll,
	isLoaded,
	isEnabled,
	isInitialized
}
