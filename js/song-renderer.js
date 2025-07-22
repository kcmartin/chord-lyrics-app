class SongRenderer {
    constructor() {
        this.transposer = new ChordTransposer();
        this.fontSize = 16;
        this.transposeSteps = 0;
    }

    renderSong(song, targetElement) {
        targetElement.innerHTML = '';

        // Render metadata
        this.renderMetadata(song, targetElement);

        // Render sections
        song.sections.forEach(section => {
            this.renderSection(section, targetElement);
        });
    }

    renderMetadata(song, container) {
        const metadataDiv = document.createElement('div');
        metadataDiv.className = 'song-metadata';

        if (song.title) {
            const title = document.createElement('h1');
            title.textContent = song.title;
            metadataDiv.appendChild(title);
        }

        if (song.artist) {
            const artist = document.createElement('div');
            artist.className = 'artist';
            artist.textContent = song.artist;
            metadataDiv.appendChild(artist);
        }

        if (song.key || song.capo || song.tempo) {
            const keyInfo = document.createElement('div');
            keyInfo.className = 'key-info';
            const parts = [];
            
            if (song.key) parts.push(`Key: ${song.key}`);
            if (song.capo) parts.push(`Capo: ${song.capo}`);
            if (song.tempo) parts.push(`Tempo: ${song.tempo}`);
            
            keyInfo.textContent = parts.join(' • ');
            metadataDiv.appendChild(keyInfo);
        }

        container.appendChild(metadataDiv);
    }

    renderSection(section, container) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = `section ${section.type}`;

        if (section.name) {
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = section.name;
            sectionTitle.style.color = '#2c3e50';
            sectionTitle.style.marginBottom = '1rem';
            sectionDiv.appendChild(sectionTitle);
        }

        section.lines.forEach(segments => {
            const lineDiv = this.renderLine(segments);
            sectionDiv.appendChild(lineDiv);
        });

        container.appendChild(sectionDiv);
    }

    renderLine(segments) {
        
        const lineDiv = document.createElement('div');
        lineDiv.className = 'song-line';
        lineDiv.style.fontSize = `${this.fontSize}px`;

        // Create the chord line
        const chordLineDiv = document.createElement('div');
        chordLineDiv.className = 'chord-line';
        
        // Create the lyric line  
        const lyricLineDiv = document.createElement('div');
        lyricLineDiv.className = 'lyric-line';

        // Process all segments to build both lines
        let characterPosition = 0;
        
        segments.forEach(segment => {
            if (segment.type === 'chord') {
                // Add chord at current position
                const chordSpan = document.createElement('span');
                chordSpan.className = 'chord-marker';
                chordSpan.style.left = `${characterPosition * 0.6}em`;
                
                const transposedChord = this.transposer.transpose(segment.content, this.transposeSteps);
                chordSpan.textContent = transposedChord;
                chordLineDiv.appendChild(chordSpan);
                
            } else if (segment.type === 'lyric') {
                // Add lyrics to lyric line
                const textSpan = document.createElement('span');
                textSpan.textContent = segment.content;
                lyricLineDiv.appendChild(textSpan);
                
                // Update character position
                characterPosition += segment.content.length;
                
            }
        });

        // Add both lines to container
        lineDiv.appendChild(chordLineDiv);
        lineDiv.appendChild(lyricLineDiv);
        

        return lineDiv;
    }

    setFontSize(size) {
        this.fontSize = Math.max(10, Math.min(30, size));
        this.updateDisplayFontSize();
    }

    changeFontSize(delta) {
        this.setFontSize(this.fontSize + delta);
    }

    setTranspose(steps) {
        this.transposeSteps = steps;
    }

    changeTranspose(delta) {
        this.setTranspose(this.transposeSteps + delta);
    }

    updateDisplayFontSize() {
        const lines = document.querySelectorAll('.song-line');
        lines.forEach(line => {
            line.style.fontSize = `${this.fontSize}px`;
        });
    }
}