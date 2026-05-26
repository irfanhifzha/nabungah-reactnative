# nabungah-reactnative

from https://github.com/irfanhku/template-reactnativewindtsx

```
git clone https://github.com/irfanhifzha/nabungah-reactnative

cd nabungah-reactnative

npm install

npx expo start

```

cara install di hp

```
connect hp ke pc yg ada project ini

npx @react-native-community/cli init MyApp      // change MyApp
-> nanti buat folder ./MyApp


cd MyApp

npx react-native run-android
-> nanti building app di android tsb
```

---

idk err mess

```
C:\Users\Windows 11\Downloads\nabungah-reactnative>npx react-native@latest init Nabungah
Need to install the following packages:
react-native@0.85.3
Ok to proceed? (y) y

🚨️ The `init` command is deprecated.

- Switch to npx @react-native-community/cli init for the identical behavior.
- Refer to the documentation for information about alternative tools: https://reactnative.dev/docs/getting-started
Exiting...


```



```
C:\Users\Windows 11\Downloads\nabungah-reactnative>npx react-native@latest run-android

⚠️ react-native depends on @react-native-community/cli for cli commands. To fix update your package.json to include:


  "devDependencies": {
    "@react-native-community/cli": "latest",
  }



```


```
  
  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "C:\Users\Windows 11\Downloads\nabungah-reactnative\Nabungah" && npx react-native run-android
  
  Run instructions for Windows:
    • See https://microsoft.github.io/react-native-windows for the latest up-to-date instructions.
    
```

---

try 1 (commit sebelumnya, npx run:android or smth)

```

  WARNING: You should run npx react-native@latest to ensure you're always using the most current version of the CLI. NPX has cached version (0.81.5) != current release (0.85.3)
  

🚨️ The `init` command is deprecated.

- Switch to npx @react-native-community/cli init for the identical behavior.
- Refer to the documentation for information about alternative tools: https://reactnative.dev/docs/getting-started
Exiting...

C:\Users\Windows 11\Downloads\nabungah-reactnative>npx react-native@latest init Nabungah
Need to install the following packages:
react-native@0.85.3
Ok to proceed? (y) y
npm warn cleanup Failed to remove some directories [
npm warn cleanup   [
npm warn cleanup     '\\\\?\\C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\react-native',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\Users\Windows 11\AppData\Local\npm-cache\_npx\dea611a43221eddd\node_modules\react-native\ReactCommon\react\renderer\core'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\react-native\\ReactCommon\\react\\renderer\\core'
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     '\\\\?\\C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\@react-native',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\Users\Windows 11\AppData\Local\npm-cache\_npx\dea611a43221eddd\node_modules\@react-native\gradle-plugin\settings-plugin\src\main\kotlin\com\facebook'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\@react-native\\gradle-plugin\\settings-plugin\\src\\main\\kotlin\\com\\facebook'
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     '\\\\?\\C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\@react-native\\gradle-plugin',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\Users\Windows 11\AppData\Local\npm-cache\_npx\dea611a43221eddd\node_modules\@react-native\gradle-plugin\settings-plugin\src\test'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\@react-native\\gradle-plugin\\settings-plugin\\src\\test'
npm warn cleanup     }
npm warn cleanup   ],
npm warn cleanup   [
npm warn cleanup     '\\\\?\\C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules',
npm warn cleanup     [Error: EPERM: operation not permitted, rmdir 'C:\Users\Windows 11\AppData\Local\npm-cache\_npx\dea611a43221eddd\node_modules\react-native\ReactCommon\react\renderer\components\switch'] {
npm warn cleanup       errno: -4048,
npm warn cleanup       code: 'EPERM',
npm warn cleanup       syscall: 'rmdir',
npm warn cleanup       path: 'C:\\Users\\Windows 11\\AppData\\Local\\npm-cache\\_npx\\dea611a43221eddd\\node_modules\\react-native\\ReactCommon\\react\\renderer\\components\\switch'
npm warn cleanup     }
npm warn cleanup   ]
npm warn cleanup ]
npm error process terminated
npm error signal SIGINT
npm error A complete log of this run can be found in: C:\Users\Windows 11\AppData\Local\npm-cache\_logs\2026-05-26T10_43_28_543Z-debug-0.log
Terminate batch job (Y/N)? n

```


try 2

```
[Incubating] Problems report is available at: file:///C:/Users/Windows%2011/Downloads/nabungah-reactnative/Nabungah/android/build/reports/problems/problems-report.html

Deprecated Gradle features were used in this build, making it incompatible with Gradle 10.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

For more on this, please refer to https://docs.gradle.org/9.3.1/userguide/command_line_interface.html#sec:command_line_warnings in the Gradle documentation.

info 💡 Tip: Make sure that you have set up your development environment correctly, by running npx react-native doctor. To read more about doctor command visit: https://github.com/react-native-community/cli/blob/main/packages/cli-doctor/README.md#doctor 


FAILURE: Build failed with an exception.

* What went wrong:
Class org.gradle.jvm.toolchain.JvmVendorSpec does not have member field 'org.gradle.jvm.toolchain.JvmVendorSpec IBM_SEMERU'

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights from a Build Scan (powered by Develocity).
> Get more help at https://help.gradle.org.

BUILD FAILED in 5m 24s
error Failed to install the app. Command failed with exit code 1: gradlew.bat app:installDebug -PreactNativeDevServerPort=8081 FAILURE: Build failed with an exception. * What went wrong: Class org.gradle.jvm.toolchain.JvmVendorSpec does not have member field 'org.gradle.jvm.toolchain.JvmVendorSpec IBM_SEMERU' * Try: > Run with --stacktrace option to get the stack trace. > Run with --info or --debug option to get more log output. > Run with --scan to get full insights from a Build Scan (powered by Develocity). > Get more help at https://help.gradle.org. BUILD FAILED in 5m 24s.
info Run CLI with --verbose flag for more details.


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





