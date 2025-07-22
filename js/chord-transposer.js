class ChordTransposer {
    constructor() {
        this.notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        this.flatToSharp = {
            'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
        };
    }

    transpose(chord, semitones) {
        if (semitones === 0) return chord;

        const rootPattern = /^([A-G][#b]?)(.*)/;
        const match = chord.match(rootPattern);

        if (!match) return chord;

        let rootNote = match[1];
        const suffix = match[2];

        // Convert flats to sharps for easier processing
        if (this.flatToSharp[rootNote]) {
            rootNote = this.flatToSharp[rootNote];
        }

        const noteIndex = this.notes.indexOf(rootNote);
        if (noteIndex === -1) return chord;

        const newIndex = (noteIndex + semitones + 12) % 12;
        return this.notes[newIndex] + suffix;
    }
}