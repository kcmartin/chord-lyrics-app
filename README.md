# Chord Lyrics App

A web application for displaying and editing song lyrics with chord annotations, supporting the ChordPro format.

## Features ✨

- ✅ **ChordPro Format Support** - Industry-standard song format
- ✅ **Chord Positioning** - Chords display above lyrics  
- ✅ **Transposition** - Change song key with one click
- ✅ **Font Size Control** - Adjust text size for readability
- ✅ **Print-Friendly** - Clean layouts for physical sheets
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Editor/Performance Modes** - Separate editing and display views

## Quick Start 🚀

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chord-lyrics-app.git
   cd chord-lyrics-app
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # OR using Node.js
   npx http-server -p 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## Usage 📖

### Basic Format
Place chords in square brackets before the word they apply to:
```
[G]Twinkle, [C]twinkle, [G]little [C]star
```

### ChordPro Metadata
Add song information using ChordPro directives:
```
{title: Song Name}
{artist: Artist Name}
{key: G}

[G]Your lyrics with [C]chords here
```

### Controls
- **Performance Mode**: Clean view for playing music
- **Transpose**: ♯/♭ buttons to change key
- **Font Size**: A+/A- to adjust text size
- **Print**: Clean output for physical sheets

## Project Structure 📁

```
chord-lyrics-app/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Stylesheet
├── js/
│   ├── chordpro-parser.js  # ChordPro format parser
│   ├── chord-transposer.js # Chord transposition logic
│   ├── song-renderer.js    # Song display rendering
│   └── app.js              # Main application logic
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## Development Roadmap 🛣️

### Phase 1: Core Functionality ✅ COMPLETE
- Basic ChordPro parsing and display
- Chord positioning and transposition
- Editor and performance modes

### Phase 2: File Management (Planned)
- Import/export ChordPro files
- Local song library
- Cloud storage integration

### Phase 3: Advanced Features (Planned)
- Auto-scroll for hands-free playing
- Set lists for performances
- Chord diagrams

### Phase 4: PWA & Offline (Planned)
- Progressive Web App features
- Offline functionality
- Mobile app capabilities

### Phase 5: Mobile App (Planned)
- React Native mobile app
- Cross-platform sync
- Touch-optimized interface

## Contributing 🤝

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## Browser Support 🌐

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- ChordPro format specification
- Music community feedback
- Open source contributors

---

**Made with ❤️ for musicians everywhere** 🎸🎵