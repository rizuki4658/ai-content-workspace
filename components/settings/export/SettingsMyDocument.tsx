import { ideaTones, ideaTypes } from '@/lib/data/generate';
import { ContentItem } from '@/lib/types/content';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { 
    padding: 50, 
    fontFamily: 'Helvetica', 
    fontSize: 11, 
    color: '#1f2937' 
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#a70cfa',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#a70cfa',
  },
  headerDate: {
    fontSize: 10,
    color: '#6b7280',
  },
  itemContainer: {
    marginBottom: 40,
  },
  // Metadata Grid (Type, Tone, dsb)
  metadataContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 4,
    marginBottom: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  metadataItem: {
    flexDirection: 'column',
    minWidth: '20%',
  },
  label: {
    fontSize: 8,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 10,
    color: '#334155',
    fontWeight: 'medium',
  },
  // Content Styles
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#374151',
    textAlign: 'justify',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
  }
})

const MyPDFDocument = ({ data }: { data: ContentItem[] }) => (
  <Document title="AI Content Strategy Report">
    <Page size="A4" style={styles.page}>
      {/* Header Dokumen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content Report</Text>
        <Text style={styles.headerDate}>{new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}</Text>
      </View>

      {data.map((item, index) => (
        <View
          key={index}
          style={styles.itemContainer}
          break={index !== 0}>

          <Text style={styles.contentTitle}>{item.title || `Untitled Content ${index + 1}`}</Text>

          <View style={styles.metadataContainer} wrap={false}>
            <View style={styles.metadataItem}>
              <Text style={styles.label}>Type</Text>
              <Text style={styles.value}>{ideaTypes[item.type] || '-'}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.label}>Tone</Text>
              <Text style={styles.value}>{ideaTones[item.tone as keyof typeof ideaTones] || '-'}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.label}>Target</Text>
              <Text style={styles.value}>{item.targetAudience || 'General'}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.label}>Keywords</Text>
              <Text style={styles.value}>{item.keywords || '-'}</Text>
            </View>
          </View>

          <Text style={styles.bodyText}>{item.output}</Text>
        </View>
      ))}

      <Text style={styles.footer} render={({ pageNumber, totalPages }) => (
        `AI Content Workspace — Page ${pageNumber} of ${totalPages}`
      )} fixed />
    </Page>
  </Document>
)

export default MyPDFDocument
