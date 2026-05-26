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

  try {
    await db.execAsync("BEGIN TRANSACTION");

    // INSERT TRANSACTION
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

    // UPDATE WALLET BALANCE
    const operator = data.type === "income" ? "+" : "-";

    await db.runAsync(
      `
      UPDATE wallets
      SET balance = balance ${operator} ?
      WHERE id = ?
      `,
      [data.amount, data.wallet_id]
    );

    await db.execAsync("COMMIT");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  const result = await db.getAllAsync<Transaction>(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );

  return result;
}

export async function removeTransaction(id: string) {
  try {
    await db.execAsync("BEGIN TRANSACTION");

    // GET TRANSACTION
    const transaction = await db.getFirstAsync<Transaction>(
      "SELECT * FROM transactions WHERE id = ?",
      [id]
    );

    if (!transaction) {
      await db.execAsync("ROLLBACK");
      return;
    }

    // RESTORE BALANCE
    const operator =
      transaction.type === "income" ? "-" : "+";

    await db.runAsync(
      `
      UPDATE wallets
      SET balance = balance ${operator} ?
      WHERE id = ?
      `,
      [transaction.amount, transaction.wallet_id]
    );

    // DELETE TRANSACTION
    await db.runAsync(
      "DELETE FROM transactions WHERE id = ?",
      [id]
    );

    await db.execAsync("COMMIT");
  } catch (error) {
    await db.execAsync("ROLLBACK");
    throw error;
  }
}