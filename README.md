# 🍔 TechnoCart POS - Restaurant Billing & Management System

A production-ready, ultra-fast, and responsive Restaurant Point of Sale (POS) application built from scratch to streamline food ordering, table management, and instant tax-calculated bill receipt generation.

---

## 🚀 Key Core Features Implemented

- **Dynamic Interactive Menu**: Staff can browse diverse food entries and add multiple items directly to the selected table's cart workspace.
- **Robust Cart Workspace**: Support for increasing or decreasing quantities instantly with live total pricing adjustments.
- **Table Allocation System**: Multi-table dropdown assignment mechanism to handle individual customer queues seamlessly.
- **Live Active Orders Queue**: Real-time order sequence panel that handles placed orders in the background until final checkouts.
- **Instant Final Billing Engine**: Generates precise final print receipts with embedded automated tax configurations (5% GST calculation) and aggregated Grand Totals.

---

## 📦 Architecture & Workflow Graph

```text
[ Menu Items Selection ] ──> [ Table Cart Workspace ] ──> [ Active Orders Queue ] ──> [ Tax-Calculated Receipt Modal ]
```

---

## 🛠️ Step-by-Step Local Setup Instructions

To get the application up and running locally on your environment, follow these exact sequences inside your terminal:

1. **Clone/Open the workspace directory**:
   ```bash
   cd Technocart-BM
   ```

2. **Install all necessary dependency packages**:
   ```bash
   npm install
   ```

3. **Spin up the fast hot-reloading development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:  
   Open your preferred browser dashboard and hit: [ https://technocart-bm.vercel.app/ ](http://localhost:5173/)

---

## 🔮 Future Enhancement Scope

Given additional execution scope, the project has been designed modularly to easily integrate:
1. **Persistent Offline Storage**: Transitioning the reactive states into structured databases like SQLite via Prisma.
2. **KDS (Kitchen Display System)**: A dual split-screen view configuration so the backend chefs can clear preparing orders in real-time.
3. **Advanced Analytics Dashboard**: Visual graphs tracking popular dishes, table turnover rates, and daily total revenue metrics.
4.