import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function DemoList() {
  const appDir = path.join(process.cwd(), 'app');
  let items = [];
  try {
    items = fs.readdirSync(appDir, { withFileTypes: true });
  } catch (e) {
    console.error("Could not read app directory", e);
  }
  
  const routes = items
    .filter(item => item.isDirectory() && item.name !== 'demo-list' && item.name !== 'api' && !item.name.startsWith('_') && !item.name.startsWith('.'))
    .map(item => item.name);

  return (
    <>
      <style>{`
        .demo-container {
          min-height: 100vh;
          background-color: #0a2a28;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 60px 20px;
        }
        .demo-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        .demo-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
          color: #e0f2f1;
        }
        .demo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .demo-card {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
        }
        .demo-card:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .demo-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          text-transform: capitalize;
          margin: 0;
        }
        .demo-card-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .demo-card:hover .demo-card-icon {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }
        .demo-link {
          text-decoration: none;
        }
      `}</style>
      <div className="demo-container">
        <div className="demo-wrapper">
          <h1 className="demo-title">Available Demos</h1>
          
          <div className="demo-grid">
            {routes.map((route) => (
              <Link 
                key={route} 
                href={`/${route}`}
                className="demo-link"
              >
                <div className="demo-card">
                  <h2 className="demo-card-title">
                    {route.split('-').join(' ')}
                  </h2>
                  <div className="demo-card-icon">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ color: '#80cbc4' }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
              <Link 
                key={'https://perluna-demo.vercel.app/'} 
                href={`https://perluna-demo.vercel.app/`}
                className="demo-link"
              >
                <div className="demo-card">
                  <h2 className="demo-card-title">
                    perluna-demo
                  </h2>
                  <div className="demo-card-icon">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ color: '#80cbc4' }}
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}
