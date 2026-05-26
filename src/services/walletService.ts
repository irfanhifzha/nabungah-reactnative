import { db } from "@/database/db";

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  created_at: string;
};

// CREATE WALLET
export async function createWallet(name: string, balance: number = 0) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = new Date().toISOString();


  await db.runAsync(
    `INSERT INTO wallets (id, name, balance, created_at)
      VALUES (?, ?, ?, ?)`,
    [id, name, balance, createdAt]
  );

  return { id, name, balance, created_at: createdAt };
}

// GET WALLETS
export async function getWallets(): Promise<Wallet[]> {
  const wallets = await db.getAllAsync<Wallet>(
    "SELECT * FROM wallets ORDER BY created_at DESC"
  );

  return wallets;
}

// DELETE WALLET
export async function deleteWallet(id: string) {
  await db.runAsync("DELETE FROM wallets WHERE id = ?", [id]);
}

