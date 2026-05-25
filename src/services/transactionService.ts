import { db } from "@/database/db";

export type Transaction = {
  id: string;
  wallet_id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  note?: string;
  created_at: string;
};

export async function createTransaction(data: {
  wallet_id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  note?: string;
}) {
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO transactions
     (id, wallet_id, title, amount, type, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.wallet_id,
      data.title,
      data.amount,
      data.type,
      data.note ?? null,
      createdAt,
    ]
  );
}

export async function getTransactions(): Promise<Transaction[]> {
  const result = await db.getAllAsync<Transaction>(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );

  return result;
}

export async function removeTransaction(id: string) {
  await db.runAsync(
    "DELETE FROM transactions WHERE id = ?",
    [id]
  );
}