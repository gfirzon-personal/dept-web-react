export default function TopMenu() {
  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #eaeaea',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#111'
        }}>
          Dept Store
        </div>
        
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          alignItems: 'center'
        }}>
          <li>
            <a href="#home" style={{
              textDecoration: 'none',
              color: '#666',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#111'}
            onMouseLeave={(e) => e.target.style.color = '#666'}>
              Home
            </a>
          </li>
          <li>
            <a href="#products" style={{
              textDecoration: 'none',
              color: '#666',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#111'}
            onMouseLeave={(e) => e.target.style.color = '#666'}>
              Products
            </a>
          </li>
          <li>
            <a href="#about" style={{
              textDecoration: 'none',
              color: '#666',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#111'}
            onMouseLeave={(e) => e.target.style.color = '#666'}>
              About
            </a>
          </li>
          <li>
            <a href="#contact" style={{
              textDecoration: 'none',
              color: '#666',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#111'}
            onMouseLeave={(e) => e.target.style.color = '#666'}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}