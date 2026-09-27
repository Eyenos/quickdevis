import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12 },
  title: { fontSize: 20, marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontWeight: 'bold' }
})

export default function DevisPDF({ devis }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Devis</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Client :</Text>
          <Text>{devis.client_nom}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Montant :</Text>
          <Text>{devis.montant} €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Statut :</Text>
          <Text>{devis.statut}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date :</Text>
          <Text>{new Date(devis.created_at).toLocaleDateString('fr-FR')}</Text>
        </View>
      </Page>
    </Document>
  )
}