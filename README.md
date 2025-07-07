# NYC Outtings Finder

A web application that helps you find the perfect event in New York City based on your preferences.

Deployed to [Azure Static Web Apps](https://wonderful-plant-0e3de160f.6.azurestaticapps.net/)
*Disclaimer* Still need to fix google ads implementation, that is why there are blank boxes

## Features

- Filter event ideas by:
  - Budget range
  - Neighborhood preferences
  - Date and time
  - Activity types
  - Accessibility requirements
  - Dietary restrictions
  - Indoor/outdoor preferences
- View curated event suggestions with detailed information
- Mobile-responsive design
- Modern, user-friendly interface

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Hook Form
- Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nyc-date-night.git
cd nyc-date-night
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

### Project Structure

```
src/
  ├── components/        # React components
  ├── data/             # Static data and types
  ├── App.tsx           # Main application component
  └── index.tsx         # Application entry point
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. test
