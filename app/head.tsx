export default function Head() {
  return (
    <>
      {/* Primary SVG file served from /public */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

      {/* Inline data-URI SVG fallback (should show immediately in the browser) */}
      <link rel="icon" href="data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3E%3Crect%20width='64'%20height='64'%20rx='12'%20fill='%2306b6d4'/%3E%3Ctext%20x='50%25'%20y='55%25'%20font-size='26'%20font-family='Arial'%20font-weight='700'%20fill='white'%20text-anchor='middle'%3ERM%3C/text%3E%3C/svg%3E" />

      {/* Legacy fallback / Apple touch */}
      <link rel="shortcut icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      <meta name="theme-color" content="#06b6d4" />
    </>
  );
}
