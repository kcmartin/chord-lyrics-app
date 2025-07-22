### docs/development.md
```markdown
# Development Guidelines

## Code Organization
- **Separation of Concerns**: Each class handles one responsibility
- **Event-Driven**: Use event listeners for user interactions
- **Modular**: Each JavaScript file contains one main class
- **Responsive**: Mobile-first CSS design

## Class Structure
- `ChordProParser`: Handles parsing ChordPro format text
- `ChordTransposer`: Manages chord transposition logic
- `SongRenderer`: Renders parsed songs to DOM
- `ChordLyricsApp`: Main application controller

## Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Write code following existing patterns
3. Test in multiple browsers
4. Update documentation
5. Submit pull request

## Browser Support
- Chrome 70+
- Firefox 65+ 
- Safari 12+
- Edge 79+

## Performance Guidelines
- Keep DOM updates minimal
- Use CSS for animations
- Optimize for mobile performance
- Consider memory usage for large song libraries