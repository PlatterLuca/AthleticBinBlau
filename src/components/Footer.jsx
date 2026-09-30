export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white text-center text-sm py-4">
        <div className="flex justify-center mb-2">
          <a href="https://www.instagram.com/athleticklublienz" target="_blank" rel="noopener noreferrer" className="mx-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="1.8" role="img" aria-label="Instagram">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://open.spotify.com/intl-de/album/0u8Q4y87x43mS3QIi9T28B" target="_blank" rel="noopener noreferrer" className="mx-2">
            <img src="/Spotify-icon.png" alt="Spotify" className="w-5 h-5 inline" />
          </a>
        </div>

        <div className="flex justify-center gap-4 mb-2">
          <a href="/Impressum.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Impressum
          </a>
        </div>
        <p>&copy; 2026 Athletic Klub Lienz.</p>
      </footer>
    )
  }
  