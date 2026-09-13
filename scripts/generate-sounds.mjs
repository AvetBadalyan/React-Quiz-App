/**
 * Generates the quiz sound effects as small WAV files (no external tools needed).
 *
 * Run with: node scripts/generate-sounds.mjs
 *
 * Each sound is a short, synthesized tone sequence with a smooth fade so it
 * doesn't click. Kept intentionally simple and royalty-free (we generate them).
 */

import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SAMPLE_RATE = 44100
const OUT_DIR = resolve(
	dirname(fileURLToPath(import.meta.url)),
	'../public/sounds'
)

/**
 * Build a WAV buffer from an array of float samples in the range [-1, 1].
 */
function encodeWav(samples) {
	const dataLength = samples.length * 2 // 16-bit mono
	const buffer = Buffer.alloc(44 + dataLength)

	buffer.write('RIFF', 0)
	buffer.writeUInt32LE(36 + dataLength, 4)
	buffer.write('WAVE', 8)
	buffer.write('fmt ', 12)
	buffer.writeUInt32LE(16, 16) // fmt chunk size
	buffer.writeUInt16LE(1, 20) // PCM
	buffer.writeUInt16LE(1, 22) // mono
	buffer.writeUInt32LE(SAMPLE_RATE, 24)
	buffer.writeUInt32LE(SAMPLE_RATE * 2, 28) // byte rate
	buffer.writeUInt16LE(2, 32) // block align
	buffer.writeUInt16LE(16, 34) // bits per sample
	buffer.write('data', 36)
	buffer.writeUInt32LE(dataLength, 40)

	let offset = 44
	for (const s of samples) {
		const clamped = Math.max(-1, Math.min(1, s))
		buffer.writeInt16LE(Math.round(clamped * 32767), offset)
		offset += 2
	}
	return buffer
}

/**
 * Render a sequence of tones. Each note: { freq, duration } in Hz / seconds.
 * Applies a short attack/decay envelope so notes don't click.
 */
function renderTones(notes, { gain = 0.4 } = {}) {
	const samples = []
	for (const { freq, duration } of notes) {
		const total = Math.floor(SAMPLE_RATE * duration)
		const fade = Math.floor(SAMPLE_RATE * 0.01) // 10ms fade in/out
		for (let i = 0; i < total; i++) {
			let env = 1
			if (i < fade) env = i / fade
			else if (i > total - fade) env = (total - i) / fade
			samples.push(Math.sin((2 * Math.PI * freq * i) / SAMPLE_RATE) * gain * env)
		}
	}
	return samples
}

const sounds = {
	// Cheerful rising two-note chime
	correct: renderTones([
		{ freq: 659, duration: 0.12 }, // E5
		{ freq: 988, duration: 0.18 } // B5
	]),
	// Soft descending "nope"
	wrong: renderTones([
		{ freq: 311, duration: 0.14 }, // Eb4
		{ freq: 233, duration: 0.2 } // Bb3
	]),
	// Subtle single alert tick
	warning: renderTones([{ freq: 880, duration: 0.12 }], { gain: 0.35 }),
	// Light short click
	click: renderTones([{ freq: 660, duration: 0.05 }], { gain: 0.25 })
}

mkdirSync(OUT_DIR, { recursive: true })
for (const [name, samples] of Object.entries(sounds)) {
	const file = resolve(OUT_DIR, `${name}.wav`)
	writeFileSync(file, encodeWav(samples))
	console.log(`wrote ${file} (${samples.length} samples)`)
}
