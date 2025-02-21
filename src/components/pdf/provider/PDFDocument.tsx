import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

import { Project } from "@/types";

// Function to format numbers with commas and consistent decimal places
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

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

  tableContainer: { marginTop: 15, marginBottom: 20 },
  tableTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },

  // Use Flexbox instead of display: "table"
  table: {
    display: "flex",
    flexDirection: "column", // Stacks each row vertically
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 5,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row", // Places cells side by side
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    padding: 8,
    width: "33%", // 3 columns at 33% each
    textAlign: "center",
    backgroundColor: "#f3f3f3",
  },
  tableCell: {
    fontSize: 10,
    padding: 8,
    width: "33%", // match columns
    textAlign: "center",
  },

  totalContainer: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalLabel: { fontSize: 12, fontWeight: "bold", color: "#000" },
  totalValue: { fontSize: 12, fontWeight: "bold", color: "#000" },
  totalPrice: { fontSize: 16, fontWeight: "bold", marginTop: 8, color: "#000" },

  // For total rows at the end of each task
  taskTotalRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#000",
    backgroundColor: "#f3f3f3",
  },
  taskTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 8,
    width: "50%",
    textAlign: "right",
    color: "#000",
  },
  taskTotalValue: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 8,
    width: "50%",
    textAlign: "center",
    color: "#000",
  },
});

export default function ProviderPDF({ project }: { project: Project }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>DETAILED QUOTE</Text>
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

        {/* Task-Based Tables */}
        {project.tasks.map((task) => (
          <View key={task.id} style={styles.tableContainer} wrap={false}>
            {/* Task Title */}
            <Text style={styles.tableTitle}>{task.name}</Text>

            {/* Table Header */}
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>CATEGORY</Text>
                <Text style={styles.tableCellHeader}>DESCRIPTION</Text>
                <Text style={styles.tableCellHeader}>COST</Text>
              </View>

              {/* Materials */}
              {task.materials.map((mat) => (
                <View key={mat.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>Material</Text>
                  <Text style={styles.tableCell}>{mat.name}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(mat.cost)}</Text>
                </View>
              ))}

              {/* Labors */}
              {task.labors.map((lab) => (
                <View key={lab.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>Labor</Text>
                  <Text style={styles.tableCell}>{lab.role}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(lab.cost)}</Text>
                </View>
              ))}

              {/* Additional Costs */}
              {task.additional.map((add) => (
                <View key={add.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>Additional</Text>
                  <Text style={styles.tableCell}>{add.type}</Text>
                  <Text style={styles.tableCell}>{formatCurrency(add.cost)}</Text>
                </View>
              ))}

              {/* Task Totals (Cost & Price) */}
              <View style={styles.taskTotalRow} wrap={false}>
                <Text style={styles.taskTotalLabel}>Total Cost:</Text>
                <Text style={styles.taskTotalValue}>{formatCurrency(task.totalCost)}</Text>
              </View>
              <View style={styles.taskTotalRow} wrap={false}>
                <Text style={styles.taskTotalLabel}>Total Price:</Text>
                <Text style={styles.taskTotalValue}>{formatCurrency(task.totalPrice)}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Overall Totals */}
        <View style={styles.totalContainer} wrap={false}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Cost:</Text>
            <Text style={styles.totalValue}>{formatCurrency(project.totalCost)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Profit Margin:</Text>
            <Text style={styles.totalValue}>{project.profitMargin.toFixed(1)}%</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Profit:</Text>
            <Text style={styles.totalValue}>{formatCurrency(project.totalProfit)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontSize: 14 }]}>Total Price:</Text>
            <Text style={styles.totalPrice}>{formatCurrency(project.totalPrice)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
