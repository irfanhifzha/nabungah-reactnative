export const schema = `
CREATE TABLE IF NOT EXISTS wallets (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  balance INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY NOT NULL,
  wallet_id TEXT NOT NULL,
  title TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  note TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  target_amount INTEGER NOT NULL,
  saved_amount INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS quick_actions (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL
);
`;