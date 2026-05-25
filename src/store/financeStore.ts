import { create } from "zustand";
import {
  getWallets,
  createWallet,
  deleteWallet,
} from "@/services/walletService";

export type Wallet = {
  id: string;
  name: string;
  balance: number;
  created_at: string;
};

type FinanceStore = {
  wallets: Wallet[];
  loadWallets: () => Promise<void>;
  addWallet: (name: string, balance: number) => Promise<void>;
  removeWallet: (id: string) => Promise<void>;
};

export const useFinanceStore = create<FinanceStore>((set) => ({
  wallets: [],

  loadWallets: async () => {
    const data = await getWallets();
    set({ wallets: data });
  },

  addWallet: async (name: string, balance: number) => {
    await createWallet(name, balance);
    const data = await getWallets();
    set({ wallets: data });
  },

  removeWallet: async (id: string) => {
    await deleteWallet(id);
    const data = await getWallets();
    set({ wallets: data });
  },
}));