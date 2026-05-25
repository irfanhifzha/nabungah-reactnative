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

  const wallets = await db.getAllAsync<any>(
    "SELECT * FROM wallets ORDER BY created_at DESC"
  );

  const transactions = await db.getAllAsync<any>(
    "SELECT * FROM transactions"
  );


  const result = wallets.map((w) => {
    const walletTx = transactions.filter((t) => t.wallet_id === w.id);

    const income = walletTx
      .filter((t) => t.type === "income")
      .reduce((a, t) => a + Number(t.amount), 0);

    const expense = walletTx
      .filter((t) => t.type === "expense")
      .reduce((a, t) => a + Number(t.amount), 0);

    return {
      ...w,
      balance: Number(w.balance || 0) + income - expense,
    };
  });


  return result;
}

// DELETE WALLET
export async function deleteWallet(id: string) {
  await db.runAsync("DELETE FROM wallets WHERE id = ?", [id]);
}

