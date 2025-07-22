class ChordProParser {
    constructor() {
        this.song = this.createEmptySong();
    }

    createEmptySong() {
        return {
            title: '',
            artist: '',
            key: '',
            tempo: '',
            capo: '',
            sections: []
        };
    }

    parse(text) {
        console.log('Parsing text:', text); // Debug log
        this.song = this.createEmptySong();
        const lines = text.split('\n');
        let currentSection = {
            type: 'verse',
            name: '',
            lines: []
        };

        lines.forEach(line => {
            line = line.trim();
            
            if (line === '' || line.startsWith('#')) {
                return;
            }

            if (line.match(/^\{.*\}$/)) {
                currentSection = this.parseDirective(line, currentSection);
                return;
            }

            if (line.length > 0) {
                const parsedLine = this.parseLyricsLine(line);
                console.log('Parsed line:', parsedLine); // Debug log
                currentSection.lines.push(parsedLine);
            }
        });

        if (currentSection.lines.length > 0) {
            this.song.sections.push(currentSection);
        }

        console.log('Final parsed song:', this.song); // Debug log
        return this.song;
    }

    parseDirective(line, currentSection) {
        const directive = line.substring(1, line.length - 1);
        const colonIndex = directive.indexOf(':');
        
        if (colonIndex === -1) return currentSection;
        
        const command = directive.substring(0, colonIndex).trim();
        const value = directive.substring(colonIndex + 1).trim();

        switch (command) {
            case 'title':
                this.song.title = value;
                break;
            case 'artist':
                this.song.artist = value;
                break;
            case 'key':
                this.song.key = value;
                break;
            case 'tempo':
                this.song.tempo = value;
                break;
            case 'capo':
                this.song.capo = value;
                break;
            case 'start_of_verse':
            case 'start_of_chorus':
            case 'start_of_bridge':
                if (currentSection.lines.length > 0) {
                    this.song.sections.push(currentSection);
                }
                currentSection = {
                    type: command.replace('start_of_', ''),
                    name: value || '',
                    lines: []
                };
                break;
        }
        
        return currentSection;
    }

    parseLyricsLine(line) {
        const segments = [];
        const chordRegex = /\[([^\]]+)\]/g;
        let match;
        let lastIndex = 0;

        while ((match = chordRegex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                segments.push({
                    type: 'lyric',
                    content: line.substring(lastIndex, match.index)
                });
            }

            segments.push({
                type: 'chord',
                content: match[1]
            });

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < line.length) {
            segments.push({
                type: 'lyric',
                content: line.substring(lastIndex)
            });
        }

        return segments;
    }
}