# Sound Effects

These are short, royalty-free sound effects used by the quiz. They are
generated locally as WAV files by `scripts/generate-sounds.mjs`, so there are
no third-party assets or licensing concerns.

## Files

- `correct.wav` — cheerful rising chime when the answer is correct
- `wrong.wav` — soft descending tone when the answer is wrong
- `warning.wav` — subtle alert tick when the timer hits 5 seconds
- `click.wav` — light click on category / difficulty / start buttons

## Regenerating

```bash
npm run sounds
```

To use your own effects instead, drop replacement files here (any browser-
supported format works) and update the paths in
`src/services/soundManager.js`. Good sources for royalty-free sounds:

- https://freesound.org/
- https://mixkit.co/free-sound-effects/
