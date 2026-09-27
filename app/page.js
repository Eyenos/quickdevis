import Link from 'next/link'

function Logo() {
  return (
    <div className="logo">
      <svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,60 L20,42 L45,56 L70,36 L100,20 L130,36 L155,56 L180,42 L180,60 L180,138 C180,188 145,218 100,234 C55,218 20,188 20,138 Z" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M52,112 Q100,80 148,112 Q100,144 52,112 Z" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round"/>
        <circle cx="100" cy="112" r="17" fill="#FFFFFF"/>
        <circle cx="106" cy="106" r="5" fill="#1B2A6B"/>
        <path d="M72,140 Q100,158 128,140" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round"/>
      </svg>
      <span>Eyenos</span>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <nav className="navbar">
        <Link href="/"><Logo /></Link>
        <div className="nav-right">
          <Link href="/login">Se connecter</Link>
          <Link href="/signup">
            <button>Créer un compte</button>
          </Link>
        </div>
      </nav>

      <div className="hero">
        <h1>Des outils simples pour les indépendants qui n'ont pas de temps à perdre.</h1>
        <p>
          Eyenos conçoit des logiciels pensés pour le quotidien des indépendants et des petites structures — 
          à commencer par la gestion de vos devis.
        </p>
        <Link href="#produits">
          <button>Découvrir nos outils</button>
        </Link>
      </div>

      <div className="section" id="produits">
        <p className="section-label">Nos outils</p>

        <div className="showcase-panel">
          <div>
            <span className="badge">Disponible</span>
            <h3>QuickDevis</h3>
            <p>Créez, suivez et exportez vos devis en quelques minutes, avec toutes les mentions légales requises.</p>
          </div>
          <Link href="/signup">
            <button>Essayer QuickDevis</button>
          </Link>
        </div>

        <div className="soon-panel">
          <h3>Prochain outil</h3>
          <p>D'autres outils Eyenos arrivent bientôt pour les indépendants.</p>
        </div>
      </div>

      <footer className="footer">
        Eyenos SAS — <Link href="/mentions-legales">Mentions légales</Link>
      </footer>
    </div>
  )
}