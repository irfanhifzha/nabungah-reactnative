Here’s a **proper “app documentation” view** of your finance app — like what you’d write if you were turning it into a real product or preparing to rebuild it in React Native + SQLite.

I’ll structure it like a real internal spec.

---

# 📘 App Documentation — Personal Finance Tracker

## 1. Overview

A **local-first personal finance tracker** for mobile devices.

The app allows users to:

* track income & expenses
* manage multiple wallets
* create savings goals
* use quick transaction presets
* view monthly financial summaries
* store everything locally (offline-only)

No cloud sync. No backend dependency.

---

# 2. Core Principles

* 📱 **Offline-first (100% local)**
* ⚡ Fast interaction (no network latency)
* 🔐 Private (data never leaves device)
* 🧠 Simple mental model (wallet → transactions → summaries)
* 💾 Persistent local storage (SQLite)

---

# 3. Data Model

## 3.1 Wallets

Represents user money containers.

```txt id="wlt1"
Wallet {
  id: string
  name: string
  balance: number (optional cached)
  createdAt: datetime
}
```

### Purpose:

* track multiple accounts (cash, bank, e-wallet)

---

## 3.2 Transactions

Core entity of the app.

```txt id="trx1"
Transaction {
  id: string
  walletId: string
  title: string
  amount: number
  type: "income" | "expense"
  note: string
  createdAt: datetime
}
```

### Purpose:

* record all money movement
* source of truth for analytics

---

## 3.3 Goals (Savings / “Nabung”)

```txt id="goal1"
Goal {
  id: string
  title: string
  targetAmount: number
  savedAmount: number
  status: "in_progress" | "completed" | "cancelled"
}
```

### Purpose:

* track savings targets manually

---

## 3.4 Quick Actions

Preset transaction templates.

```txt id="qa1"
QuickAction {
  id: string
  title: string
  amount: number
  type: "income" | "expense"
}
```

### Purpose:

* fast transaction creation

---

## 3.5 Monthly Snapshot (optional cache)

```txt id="ms1"
MonthlyData {
  month: string (YYYY-MM)
  totalIncome: number
  totalExpense: number
  totalBalance: number
  feePercent: number
  feeExpense: number
  updatedAt: datetime
}
```

### Purpose:

* performance optimization
* historical reporting

---

# 4. Database Design (SQLite)

## Tables

### wallets

```sql id="sql1"
id TEXT PRIMARY KEY
name TEXT
created_at TEXT
```

---

### transactions

```sql id="sql2"
id TEXT PRIMARY KEY
wallet_id TEXT
title TEXT
amount INTEGER
type TEXT
note TEXT
created_at TEXT
```

---

### goals

```sql id="sql3"
id TEXT PRIMARY KEY
title TEXT
target_amount INTEGER
saved_amount INTEGER
status TEXT
```

---

### quick_actions

```sql id="sql4"
id TEXT PRIMARY KEY
title TEXT
amount INTEGER
type TEXT
```

---

### monthly_data (optional)

```sql id="sql5"
month TEXT PRIMARY KEY
total_income INTEGER
total_expense INTEGER
total_balance INTEGER
fee_percent REAL
fee_expense INTEGER
updated_at TEXT
```

---

# 5. App Architecture

## Layered structure

```txt id="arch1"
UI Layer (React Native Screens)
        ↓
State Layer (Zustand)
        ↓
Service Layer (Business Logic)
        ↓
Database Layer (SQLite)
```

---

## 5.1 UI Layer

Responsibilities:

* rendering screens
* user input
* modal handling

NO business logic.

---

## 5.2 State Layer (Zustand)

Responsibilities:

* cache loaded data
* UI state
* filters (month/type)
* temporary selections

---

## 5.3 Service Layer

Responsibilities:

* create transaction
* update wallet balance
* calculate monthly stats
* handle queries

Example:

```txt id="svc1"
createTransaction()
deleteTransaction()
getMonthlySummary()
transferBalance()
```

---

## 5.4 Database Layer

Responsibilities:

* SQLite queries
* migrations
* schema management

---

# 6. Core Features

## 6.1 Wallet System

* multiple wallets
* balance tracking
* transfer between wallets

---

## 6.2 Transactions

* income / expense tracking
* filtering (month, type, limit)
* copy/export transaction

---

## 6.3 Quick Actions

* preset transactions
* instant creation

---

## 6.4 Goals

* savings tracking
* manual progress updates
* status tracking

---

## 6.5 Monthly Overview

* income sum
* expense sum
* fee calculation
* balance snapshot

---

# 7. Business Logic Rules

## Wallet balance rule

Option A (current approach):

* balance stored and updated directly

Option B (recommended):

* balance calculated from transactions

Preferred for accuracy:

```txt id="rule1"
balance = sum(income) - sum(expenses)
```

---

## Transaction rule

* every transaction must belong to a wallet
* amount must be > 0
* type must be valid enum

---

## Goal rule

* savedAmount ≤ targetAmount
* status auto-updates when reached

---

# 8. Performance Expectations

Because everything is local:

* app startup: < 1s
* transaction load: instant
* filtering: instant (SQLite query or in-memory)
* no network delay

---

# 9. Storage Summary

* App size: 20–40 MB
* User data: 1–50 MB typical
* Heavy users: up to ~100–150 MB max

---

# 10. Future Expandability (optional)

If you ever upgrade later:

* cloud backup (Firebase / Supabase)
* multi-device sync
* analytics dashboard
* receipt scanning (OCR)
* budget limits per category

---

# 🧠 Final Summary

Your app is essentially:

> A **local financial ledger system with UI layer on top**

It is:

* structurally simple
* highly scalable locally
* very fast
* privacy-first
* easy to maintain once architecture is clean

---

If you want next step, I can generate:

✔ full React Native project structure
✔ SQLite schema + working code setup (Expo)
✔ migration plan from your Firebase version
✔ or even a clean rebuild blueprint step-by-step

Just tell me.
