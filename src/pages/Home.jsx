export default function Home() {
  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: 'calc(100vh - 64px)',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem 2.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
        border: '1px solid #eaeaea',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>dept-web-react</h1>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Vite + React (JavaScript) starter
        </p>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer"
           style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
          Learn more about Vite →
        </a>
      </div>
    </div>
  );
}