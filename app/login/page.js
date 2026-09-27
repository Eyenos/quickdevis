'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../lib/supabase'

function Logo() {
  return (
    <div className="logo">
      <svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg" style={{ height: '32px', width: 'auto' }}>
        <path d="M20,60 L20,42 L45,56 L70,36 L100,20 L130,36 L155,56 L180,42 L180,60 L180,138 C180,188 145,218 100,234 C55,218 20,188 20,138 Z" fill="none" stroke="#1B2A6B" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round"/>
        <path d="M52,112 Q100,80 148,112 Q100,144 52,112 Z" fill="none" stroke="#1B2A6B" strokeWidth="8" strokeLinejoin="round"/>
        <circle cx="100" cy="112" r="17" fill="#1B2A6B"/>
        <circle cx="106" cy="106" r="5" fill="#F7F5EF"/>
        <path d="M72,140 Q100,158 128,140" fill="none" stroke="#1B2A6B" strokeWidth="7" strokeLinecap="round"/>
      </svg>
      <span>Eyenos</span>
    </div>
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <Logo />
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="switch-link">
          Pas encore de compte ? <Link href="/signup">Créer un compte</Link>
        </p>
      </div>
    </div>
  )
}