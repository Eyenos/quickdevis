'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase'

export default function NouveauDevis() {
  const [clientNom, setClientNom] = useState('')
  const [montant, setMontant] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()

    const { error } = await supabase.from('devis').insert({
      user_id: userData.user.id,
      client_nom: clientNom,
      montant: parseFloat(montant),
      statut: 'envoyé'
    })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Nouveau devis</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du client"
          value={clientNom}
          onChange={(e) => setClientNom(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
        />
        <input
          type="number"
          placeholder="Montant (€)"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Créer le devis</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}