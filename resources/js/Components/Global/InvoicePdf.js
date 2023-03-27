import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#F4F4F4',
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    table: {
        display: 'table',
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    value: {
        fontSize: 14,
        marginBottom: 10,
        color: '#666',
        textAlign: 'center',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 12,
        color: '#666',
    },
});

// Create Document Component
const Invoice = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.heading}>Invoice</Text>
                <View style={styles.section}>
                    {/* <Text style={[styles.label, { textAlign: 'center' }]}>Company:</Text> */}
                    <Text style={[styles.value, { textAlign: 'center' }]}>{'💰 FINANCE 💰'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>User:</Text>
                    <Text style={styles.value}>{'anonymous'}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{props.invoiceData.created_at}</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { width: '50%' }]}>
                            <Text style={styles.label}>Amount:</Text>
                            <Text style={[styles.value, { textAlign: 'center' }]}>
                                {props.invoiceData.amount}
                            </Text>
                        </View>
                        <View style={[styles.tableCell, { width: '50%' }]}>
                            <Text style={styles.label}>Brand:</Text>
                            <Text style={[styles.value, { textAlign: 'center' }]}>
                                {props.invoiceData.brand.name}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, { width: '100%' }]}>
                            <Text style={styles.label}>Note:</Text>
                            <Text style={[styles.value, { textAlign: 'center' }]}>
                                {props.invoiceData.note}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>Powered by FINANCE</Text>
            </View>
        </Page>
    </Document>
);


export default Invoice;