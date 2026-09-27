'use client'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DevisPDF from '../../lib/DevisPDF'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [devis, setDevis] = useState([])
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)

      const { data: devisData } = await supabase
        .from('devis')
        .select('*')
        .order('created_at', { ascending: false })

      setDevis(devisData || [])
    })
  }, [router])

  if (!user) return <p style={{ padding: '2rem' }}>Chargement...</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dashboard</h1>
      <p>Connecté en tant que : {user.email}</p>

      <Link href="/dashboard/nouveau-devis">
        <button style={{ padding: '0.5rem 1rem', marginBottom: '1.5rem' }}>
          + Nouveau devis
        </button>
      </Link>

      <h2>Mes devis</h2>
      {devis.length === 0 ? (
        <p>Aucun devis pour le moment.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
  <th style={{ padding: '0.5rem' }}>Client</th>
  <th style={{ padding: '0.5rem' }}>Montant</th>
  <th style={{ padding: '0.5rem' }}>Statut</th>
  <th style={{ padding: '0.5rem' }}>PDF</th>
            </tr>
          </thead>
          <tbody>
            {devis.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid #eee' }}>
                 <td style={{ padding: '0.5rem' }}>{d.client_nom}</td>
                 <td style={{ padding: '0.5rem' }}>{d.montant} €</td>
                 <td style={{ padding: '0.5rem' }}>{d.statut}</td>
                 <td style={{ padding: '0.5rem' }}>
                   <PDFDownloadLink document={<DevisPDF devis={d} />} fileName={`devis-${d.client_nom}.pdf`}>
                     {({ loading }) => (loading ? 'Génération...' : 'Télécharger')}
                   </PDFDownloadLink>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}