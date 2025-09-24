# Computer Science Society Human Bingo! 🎮

A fun, interactive Human Bingo web app designed for CS Society events. Players fill squares with names of people who match various tech and personality descriptions to get BINGO!

![CS Society Logo](public/CSS_logo_purple_bg.PNG)

## Features

- 🎯 **5x5 Bingo Board** with CS-themed prompts
- 💾 **Auto-save** progress using localStorage
- ✍️ **Two Input Modes**: Type names or handwrite them (beta)
- 🎉 **Win Detection** with animated strike lines
- 📱 **Mobile-first** responsive design
- 🎨 **Beautiful UI** with custom theme colors
- ♿ **Accessible** with proper touch targets and keyboard navigation

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + localStorage
- **Deployment**: Optimized for Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/human-bingo.git
cd human-bingo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

1. **Find People**: Look for people who match each square's description
2. **Add Names**: Click/tap a square to add their name
3. **Input Options**: Type the name or try handwriting it
4. **Win**: Complete a row, column, or diagonal to get BINGO!
5. **Celebrate**: See the strike line animation and congratulations message
6. **Multiple Wins**: Try to get multiple BINGOs for extra fun!

## Project Structure

```
human-bingo/
├── app/
│   ├── layout.tsx      # Global layout with header/footer
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles and theme
├── components/
│   ├── BingoBoard.tsx  # Main game board
│   ├── BingoCell.tsx   # Individual cell component
│   ├── NameEditor.tsx  # Name input modal
│   ├── StrikeLayer.tsx # Win line overlay
│   └── Toolbar.tsx     # Reset and instructions
├── lib/
│   ├── bingo.ts        # Game logic
│   ├── storage.ts      # localStorage utilities
│   ├── types.ts        # TypeScript definitions
│   └── utils.ts        # Helper functions
└── public/
    └── CSS_logo_purple_bg.PNG  # CS Society logo
```

## Theme Colors

```css
--lavender: #AA95C6
--charcoal: #1E1F29
--off-white: #E9ECEB
--violet: #9286B5
--mint: #84D594
--magenta: #DFA4D8
--error: #FF6B6B
--warning: #FFD93D
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Deploy with default Next.js settings

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Build for Production

```bash
npm run build
npm run start
```

## Features Roadmap

- [x] Basic game functionality
- [x] Typed name input
- [x] Handwritten name input (beta)
- [x] Win detection and animations
- [x] LocalStorage persistence
- [x] Mobile responsive design
- [ ] Export board as PNG
- [ ] Theme toggle (light/dark)
- [ ] Share link with state
- [ ] Sound effects
- [ ] Multiplayer mode

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Credits

© Shahjalal - Computer Science Society

---

Made with ❤️ for CS Society events and activities!
