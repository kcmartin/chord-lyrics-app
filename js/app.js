class ChordLyricsApp {
    constructor() {
        this.parser = new ChordProParser();
        this.renderer = new SongRenderer();
        this.currentMode = 'editor';
        this.currentSong = null;
        
        this.initializeElements();
        this.bindEvents();
        this.loadExampleSong();
    }

    initializeElements() {
        this.editorMode = document.getElementById('editor-mode');
        this.performanceMode = document.getElementById('performance-mode');
        this.toggleModeBtn = document.getElementById('toggle-mode');
        this.modeText = document.getElementById('mode-text');
        
        this.titleInput = document.getElementById('song-title');
        this.artistInput = document.getElementById('song-artist');
        this.keyInput = document.getElementById('song-key');
        this.chordEditor = document.getElementById('chord-editor');
        
        this.songContent = document.getElementById('song-content');
        this.transposeDisplay = document.getElementById('transpose-display');
    }

    bindEvents() {
        this.toggleModeBtn.addEventListener('click', () => this.toggleMode());
        
        document.getElementById('load-example').addEventListener('click', () => this.loadExampleSong());
        document.getElementById('clear-editor').addEventListener('click', () => this.clearEditor());
        
        document.getElementById('transpose-up').addEventListener('click', () => this.changeTranspose(1));
        document.getElementById('transpose-down').addEventListener('click', () => this.changeTranspose(-1));
        document.getElementById('transpose-reset').addEventListener('click', () => this.resetTranspose());
        
        document.getElementById('font-larger').addEventListener('click', () => this.changeFontSize(2));
        document.getElementById('font-smaller').addEventListener('click', () => this.changeFontSize(-2));
        
        document.getElementById('print-song').addEventListener('click', () => this.printSong());
        
        // Auto-update on input changes
        [this.titleInput, this.artistInput, this.keyInput, this.chordEditor].forEach(input => {
            input.addEventListener('input', () => this.updateSong());
        });
    }

    loadExampleSong() {
        const example = `{title: Twinkle Twinkle Little Star}
{artist: Traditional}
{key: G}

[G]Twinkle, [C]twinkle, [G]little [C]star,
[G]How I [C]wonder [G]what you [C]are!
[D7]Up a[G]bove the [D7]world so [G]high,
[D7]Like a [G]diamond [D7]in the [G]sky.
[G]Twinkle, [C]twinkle, [G]little [C]star,
[G]How I [C]wonder [G]what you [C]are!`;

        console.log('Loading example song:', example); // Debug log
        this.chordEditor.value = example;
        this.updateSong();
    }

    clearEditor() {
        this.titleInput.value = '';
        this.artistInput.value = '';
        this.keyInput.value = '';
        this.chordEditor.value = '';
        this.updateSong();
    }

    updateSong() {
        let content = this.chordEditor.value;
        
        // Add metadata from inputs if not in ChordPro format
        if (this.titleInput.value && !content.includes('{title:')) {
            content = `{title: ${this.titleInput.value}}\n` + content;
        }
        if (this.artistInput.value && !content.includes('{artist:')) {
            content = `{artist: ${this.artistInput.value}}\n` + content;
        }
        if (this.keyInput.value && !content.includes('{key:')) {
            content = `{key: ${this.keyInput.value}}\n` + content;
        }
        
        console.log('Updating song with content:', content); // Debug log
        this.currentSong = this.parser.parse(content);
        console.log('Current song after parsing:', this.currentSong); // Debug log
        this.updatePerformanceDisplay();
        this.updateMetadataInputs();
    }

    updateMetadataInputs() {
        if (this.currentSong) {
            this.titleInput.value = this.currentSong.title || '';
            this.artistInput.value = this.currentSong.artist || '';
            this.keyInput.value = this.currentSong.key || '';
        }
    }

    updatePerformanceDisplay() {
        if (this.currentSong) {
            this.renderer.renderSong(this.currentSong, this.songContent);
        }
    }

    toggleMode() {
        if (this.currentMode === 'editor') {
            this.currentMode = 'performance';
            this.editorMode.classList.add('hidden');
            this.performanceMode.classList.remove('hidden');
            this.modeText.textContent = 'Edit Mode';
            this.updatePerformanceDisplay();
        } else {
            this.currentMode = 'editor';
            this.performanceMode.classList.add('hidden');
            this.editorMode.classList.remove('hidden');
            this.modeText.textContent = 'Performance Mode';
        }
    }

    changeTranspose(delta) {
        this.renderer.changeTranspose(delta);
        this.transposeDisplay.textContent = this.renderer.transposeSteps > 0 ? 
            `+${this.renderer.transposeSteps}` : 
            this.renderer.transposeSteps.toString();
        this.updatePerformanceDisplay();
    }

    resetTranspose() {
        this.renderer.setTranspose(0);
        this.transposeDisplay.textContent = '0';
        this.updatePerformanceDisplay();
    }

    changeFontSize(delta) {
        this.renderer.changeFontSize(delta);
    }

    printSong() {
        window.print();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChordLyricsApp();
});