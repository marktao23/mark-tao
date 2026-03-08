export default function FooterSocials() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a
          className="social-link"
          href="https://www.linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
            <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2.02 2.02 0 0 0 3.2 5.02c0 1.11.9 2.01 2.01 2.01a2.02 2.02 0 1 0 .04-4.03ZM20.44 12.68c0-3.44-1.83-5.04-4.28-5.04-1.97 0-2.85 1.08-3.34 1.84V8.5H9.44c.04.65 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.12-.92.27-.68.89-1.39 1.93-1.39 1.36 0 1.91 1.04 1.91 2.57V20h3.38v-7.32Z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://github.com/marktao23/mark-tao"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 0 0 8.36 22.92c.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.27-5.24-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.01 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.63 1.56.24 2.72.12 3.01.74.8 1.18 1.82 1.18 3.07 0 4.42-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.02 2.8-.02 3.18 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="https://www.instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.32 1.72H7.93a4.21 4.21 0 0 0-4.21 4.21v8.14a4.21 4.21 0 0 0 4.21 4.21h8.14a4.21 4.21 0 0 0 4.21-4.21V7.93a4.21 4.21 0 0 0-4.21-4.21ZM12 7.57A4.43 4.43 0 1 1 7.57 12 4.43 4.43 0 0 1 12 7.57Zm0 1.72A2.71 2.71 0 1 0 14.71 12 2.71 2.71 0 0 0 12 9.29Zm4.63-3.06a1.06 1.06 0 1 1-1.06 1.06 1.06 1.06 0 0 1 1.06-1.06Z" />
          </svg>
        </a>

        <a
          className="social-link"
          href="mailto:mark@example.com"
          aria-label="Email"
        >
          <svg viewBox="0 0 24 24" className="social-icon" fill="currentColor">
            <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.3-.8L12 9.75l6.7-5.05H5.3ZM19 7l-6.4 4.83a1 1 0 0 1-1.2 0L5 7v11a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V7Z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}