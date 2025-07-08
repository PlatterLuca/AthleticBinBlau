export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <div className="flex justify-center mb-2">
          <a href="https://www.instagram.com/_athletic_binblau" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="/ig-icon.png" alt="Instagram" className="w-6 h-6 inline" />
          </a>
          <a href="https://open.spotify.com/intl-de/album/0u8Q4y87x43mS3QIi9T28B" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="/Spotify-icon.png" alt="Spotify" className="w-5 h-5 inline" />
          </a>
        </div>
        <p>&copy; 2024 Athletic Binblau. All Rights Reserved.</p>
      </footer>
    )
  }
  