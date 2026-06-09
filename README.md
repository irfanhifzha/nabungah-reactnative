# nabungah-reactnative

from https://github.com/irfanhku/template-reactnativewindtsx

```
git clone https://github.com/irfanhifzha/nabungah-reactnative

cd nabungah-reactnative

npm install

npx expo start

```

cara install

```

// optional but useful
npm install -g expo-cli

// install eas-cli, biar sambung ke expo web

npm install -g eas-cli

eas --version

//

eas login

// edit nama app di app.json, package.json, package-lock.json

eas build:configure

// pilih all-android-ios

eas build -p android --profile preview

// pillhan build keystore dll...


```

---


inginnya sih buat aplikasi untuk uang management system + todo singkat / tracking for (kegiatan) + tracking sakit app (react native - local db on device [dont have to sync])


---
---
---


For your use case (personal finance app, single-device only, offline-first), this is the stack architecture I’d recommend:

# Core Stack

## Frontend

* React Native
* Expo

Why:

* fastest development
* easier builds
* easier device testing
* huge ecosystem
* perfect for utility apps

---

## Database

* SQLite

Use:

* `expo-sqlite`

Why:

* built into mobile ecosystem
* stable
* fast
* transactional
* ideal for finance data

---

## State Management

You probably do NOT need Redux.

Use:

* React Context
* Zustand (recommended)

Why Zustand:

* tiny
* simple
* less boilerplate
* perfect for local-first apps

---

# Recommended Architecture

```txt id="13oh7j"
src/
│
├── screens/
│   ├── DashboardScreen.jsx
│   ├── WalletScreen.jsx
│   └── SettingsScreen.jsx
│
├── components/
│   ├── modals/
│   ├── cards/
│   └── ui/
│
├── database/
│   ├── db.js
│   ├── schema.js
│   ├── migrations.js
│   └── seed.js
│
├── services/
│   ├── transactionService.js
│   ├── walletService.js
│   ├── goalService.js
│   └── analyticsService.js
│
├── stores/
│   └── useFinanceStore.js
│
├── hooks/
│   ├── useTransactions.js
│   ├── useWallets.js
│   └── useMonthlyStats.js
│
├── utils/
│   ├── currency.js
│   ├── date.js
│   └── export.js
│
└── constants/
```

---

# Layer Responsibilities

## Screens

ONLY:

* layout
* rendering
* UI composition

NO SQL here.

---

## Services

Handles:

* database operations
* finance calculations
* transaction logic

Example:

```js id="c6v31r"
await transactionService.createExpense(...)
```

---

## Database Layer

Handles:

* opening SQLite DB
* table creation
* migrations

---

## Zustand Store

Holds:

* loaded wallets
* loaded transactions
* filters
* UI state

Think:

```txt id="7pvqib"
single source of truth in memory
```

---

# Suggested Database Schema

## wallets

```sql id="5nd5mv"
CREATE TABLE wallets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT
);
```

---

## transactions

```sql id="n3n7y0"
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  wallet_id TEXT,
  title TEXT,
  amount INTEGER,
  type TEXT,
  note TEXT,
  created_at TEXT
);
```

---

## goals

```sql id="qv2hjf"
CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  title TEXT,
  target_amount INTEGER,
  saved_amount INTEGER,
  status TEXT
);
```

---

# Important Recommendation

## DO NOT store:

```txt id="jk9g0j"
wallet.balance
```

Instead:

```sql id="grqv3u"
SELECT SUM(...)
```

from transactions.

Why:

* prevents desync
* finance apps require consistency

You can cache computed balances later if needed.

---

# Navigation

Use:

* React Navigation

Structure:

```txt id="9n0xzr"
Stack Navigator
└── Bottom Tabs
    ├── Dashboard
    ├── Transactions
    ├── Goals
    └── Settings
```

---

# UI Stack

You already use Tailwind-like classes.

Use:

* NativeWind

This gives:

```jsx id="xxs8b9"
<View className="flex-1 bg-white">
```

Very close to your current codebase.

---

# Nice Optional Additions

## Charts

* victory-native
* react-native-chart-kit

---

## Local Backup

Export/import:

* JSON
* CSV

Very valuable for finance apps.

---

# Architecture Philosophy

Your ideal architecture is:

```txt id="e2a9m5"
Local-first
Service-oriented
Thin UI layer
SQLite as source of truth
```

NOT:

```txt id="i2br4v"
huge screen components with business logic inside
```

---

# What your app becomes

Essentially:

```txt id="9y1r8d"
React Native UI
        ↓
Zustand Store
        ↓
Service Layer
        ↓
SQLite
```

Simple.
Fast.
Maintainable.
Very scalable for a single-device app.





