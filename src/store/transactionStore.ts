import { create } from "zustand";
import {
  createTransaction,
  getTransactions,
  removeTransaction,
  Transaction,
} from "@/services/transactionService";

type TransactionStore = {
  transactions: Transaction[];
  loadTransactions: () => Promise<void>;
  addTransaction: (data: {
    wallet_id: string;
    title: string;
    amount: number;
    type: "income" | "expense";
    note?: string;
  }) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
    transactions: [],

    loadTransactions: async () => {
        const data = await getTransactions();
        set({ transactions: data });
    },

    addTransaction: async (data) => {
        await createTransaction(data);
        const updated = await getTransactions();
        set({ transactions: updated });
    },

    deleteTransaction: async (id: string) => {
        await removeTransaction(id);

        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
        }));
    },
    
}));