# Temple Finder 🏛️

A modern, responsive web application for discovering and exploring temples around the world. Built with React.js, this application helps users find nearby temples, read reviews, save favorites, and share temple information.

## ✨ Features

### 🔍 Search & Discovery
- **Location-based Search**: Find temples near your current location using GPS
- **Name Search**: Search temples by name or keywords
- **Advanced Filtering**: Filter by religion, distance, and open/closed status
- **Interactive Map**: View temple locations on an integrated map

### ❤️ Personal Experience
- **Favorites System**: Save your preferred temples for quick access
- **Reviews & Ratings**: Read and write temple reviews with star ratings
- **Photo Gallery**: Browse temple images with zoom functionality
- **Dark Mode**: Toggle between light and dark themes for better viewing

### 📱 Social Features
- **Share Functionality**: Share temple details via social media, email, or direct links
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## 🚀 Live Demo

Visit the live application: [Temple Finder](http://localhost:3000) (when running locally)

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher)
- A modern web browser with geolocation support

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/temple-finder.git
   cd temple-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📖 Usage Guide

### Getting Started
1. **Allow Location Access**: Grant location permission for nearby temple recommendations
2. **Browse Temples**: Explore the temple list or use the search functionality
3. **Filter Results**: Use the filter panel to narrow down results by your preferences
4. **View Details**: Click on any temple to see detailed information, photos, and reviews

### Key Features Usage

#### 🔍 Search & Filter
- Use the search bar to find temples by name or location
- Apply filters for religion (Hindu, Buddhist, Sikh, etc.)
- Set distance radius for location-based searches
- Filter by temple status (open/closed)

#### ❤️ Favorites
- Click the heart icon on any temple to add it to favorites
- Access your saved temples from the Favorites page
- Remove temples from favorites by clicking the heart icon again

#### ⭐ Reviews
- Read existing reviews and ratings on temple detail pages
- Add your own review with a star rating (1-5 stars)
- Edit or delete your reviews as needed

#### 📷 Photo Gallery
- Browse temple images in the photo gallery
- Click on images to view them in full size
- Navigate through multiple images using arrow controls

#### 🌙 Dark Mode
- Toggle between light and dark themes using the theme switcher in the header
- Your preference is automatically saved for future visits

#### 📤 Sharing
- Share temple information via Facebook, Twitter, WhatsApp, or Telegram
- Copy direct links to share via other platforms
- Send temple details via email

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FavoriteButton/   # Favorite toggle functionality
│   ├── FilterPanel/      # Search and filter controls
│   ├── Header/          # Navigation header
│   ├── Map/             # Interactive map component
│   ├── PhotoGallery/    # Image gallery with zoom
│   ├── ReviewForm/      # Review submission form
│   ├── ReviewList/      # Display reviews
│   ├── SearchBar/       # Search input component
│   ├── ShareButton/     # Social sharing functionality
│   ├── StarRating/      # Star rating display
│   ├── TempleList/      # Temple listing component
│   └── ThemeToggle/     # Dark/light mode toggle
├── contexts/            # React context providers
│   └── ThemeContext/    # Theme management
├── data/               # Static data and utilities
│   └── templesData/     # Temple database and helper functions
├── pages/              # Main application pages
│   ├── Home/           # Homepage with search and results
│   ├── Favorites/      # Saved temples page
│   └── TempleDetails/  # Individual temple details
├── services/           # External service integrations
│   ├── favoritesService/    # Local storage for favorites
│   ├── geolocationService/  # GPS and distance calculations
│   └── reviewsService/      # Review management
└── styles/             # Global styles and themes
    └── themes.css      # CSS variables for theming
```

## 🛠️ Technologies Used

- **Frontend Framework**: React.js 18
- **Routing**: React Router DOM
- **Styling**: CSS3 with CSS Variables
- **State Management**: React Context API
- **Geolocation**: Browser Geolocation API
- **Local Storage**: Browser localStorage API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 🌍 Temple Database

The application includes a comprehensive database of temples from various religions:

- **Hindu Temples**: Meenakshi Temple, Akshardham, Siddhivinayak, etc.
- **Sikh Temples**: Golden Temple (Harmandir Sahib)
- **Buddhist Temples**: Various Buddhist monasteries and temples
- **Other Religious Sites**: Lotus Temple and more

Each temple entry includes:
- Name and address
- GPS coordinates
- Religion and description
- Opening hours
- Contact information
- High-quality images

## 🤝 Contributing

We welcome contributions to improve Temple Finder! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Temple data sourced from various public databases and APIs
- Icons and images from open-source libraries
- Inspiration from various temple and travel applications
- Community feedback and contributions

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/temple-finder/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about the issue and steps to reproduce

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Real-time temple status updates
- [ ] Integration with temple official websites
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced search with more filters
- [ ] Temple event notifications
- [ ] Virtual temple tours

---

**Made with ❤️ for temple enthusiasts and spiritual seekers worldwide**

*Last updated: January 2024*