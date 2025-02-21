import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

import { Project } from "@/types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const styles = StyleSheet.create({
  page: { padding: 40 },
  header: { textAlign: "center", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  subtitle: { fontSize: 12, fontWeight: "bold", marginBottom: 4 },
  text: { fontSize: 10, marginBottom: 2 },

  // Use Flexbox
  table: {
    display: "flex",
    flexDirection: "column", // Stack rows
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row", // Cells side-by-side
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    padding: 6,
    flex: 1,
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  },
  tableCell: {
    fontSize: 10,
    padding: 6,
    flex: 1,
    textAlign: "center",
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    textAlign: "right",
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  totalLabel: { fontSize: 12, fontWeight: "bold" },
  totalPrice: { fontSize: 16, fontWeight: "bold", marginTop: 8, color: "#000" },
});

export default function CustomerPDF({ project }: { project: Project }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>QUOTE</Text>
        </View>

        {/* User's Company Info */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>{project.user.name}</Text>
          <Text style={styles.text}>{project.user.phone}</Text>
          <Text style={styles.text}>{project.user.email}</Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Customer: {project.customer.name}</Text>
          <Text style={styles.text}>Address: {project.customer.address}</Text>
          <Text style={styles.text}>Phone: {project.customer.phone}</Text>
          <Text style={styles.text}>Email: {project.customer.email}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>TASK</Text>
            <Text style={styles.tableCellHeader}>PRICE</Text>
          </View>

          {/* Task Price Breakdown */}
          {project.tasks.map((task) => (
            <View key={task.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{task.name}</Text>
              <Text style={styles.tableCell}>{formatCurrency(task.totalPrice)}</Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total Price:</Text>
            <Text style={styles.totalPrice}>{formatCurrency(project.totalPrice)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
