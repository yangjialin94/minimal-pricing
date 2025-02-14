import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

import { Project } from "@/types";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 12, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 10 },
  table: { display: "table", width: "100%", borderWidth: 1, borderColor: "#000", marginTop: 10 },
  tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#000" },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    padding: 5,
    width: "25%",
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  },
  tableCell: { fontSize: 10, padding: 5, width: "25%", textAlign: "center" },
  terms: { fontSize: 8, marginTop: 10 },
  signature: { marginTop: 20, fontSize: 10, textAlign: "center" },
});

// PDF Document Component
export default function PDFDocument({ project }: { project: Project }) {
  // Calculate totals
  const subtotal = project.tasks.reduce((sum, task) => {
    const taskTotal =
      task.materials.reduce((acc, mat) => acc + mat.cost, 0) +
      task.labors.reduce((acc, lab) => acc + lab.cost, 0) +
      task.additional.reduce((acc, add) => acc + add.cost, 0);
    return sum + taskTotal;
  }, 0);

  const otherFees = 150; // Example additional cost
  const total = subtotal + otherFees;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>QUOTE</Text>

        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>YOUR COMPANY NAME</Text>
          <Text style={styles.text}>Company Address, City, State, ZIP</Text>
          <Text style={styles.text}>youremail@example.com</Text>
          <Text style={styles.text}>www.yourcompany.com</Text>
        </View>

        {/* Quote Info */}
        <View style={styles.section}>
          <Text style={styles.text}>QUOTE #: {project.id.slice(0, 8)}</Text>
          <Text style={styles.text}>QUOTE DATE: 02/13/2025</Text>
          <Text style={styles.text}>VALID UNTIL: 02/20/2025</Text>
          <Text style={styles.text}>CUSTOMER ID: CUST-12345</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>CUSTOMER INFORMATION:</Text>
          <Text style={styles.text}>Name: John Doe</Text>
          <Text style={styles.text}>Company: ABC Enterprises</Text>
          <Text style={styles.text}>Address: 123 Street, City, State, ZIP</Text>
          <Text style={styles.text}>Email: johndoe@example.com</Text>
        </View>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>QTY</Text>
            <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
            <Text style={styles.tableCellHeader}>UNIT PRICE</Text>
            <Text style={styles.tableCellHeader}>AMOUNT</Text>
          </View>

          {/* Table Rows */}
          {project.tasks.map((task) =>
            task.materials.map((material) => (
              <View key={material.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>1</Text>
                <Text style={styles.tableCell}>{material.name}</Text>
                <Text style={styles.tableCell}>${material.cost}</Text>
                <Text style={styles.tableCell}>${material.cost}</Text>
              </View>
            ))
          )}
        </View>

        {/* Totals */}
        <View style={styles.section}>
          <Text style={styles.text}>Subtotal: ${subtotal}</Text>
          <Text style={styles.text}>Other Fees: ${otherFees}</Text>
          <Text style={styles.text}>Total: ${total}</Text>
        </View>

        {/* Terms and Conditions */}
        <Text style={styles.terms}>
          TERMS AND CONDITIONS: This quote is an estimate at the total price for the described
          services. Payment is required prior to service.
        </Text>

        {/* Signature */}
        <Text style={styles.signature}>
          Customer Acceptance: _______________________ Date: __/__/__
        </Text>
      </Page>
    </Document>
  );
}
