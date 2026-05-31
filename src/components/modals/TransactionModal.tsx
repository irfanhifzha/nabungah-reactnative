import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";

import { createTransaction } from "@/services/transactionService";

type Wallet = {
  id: string;
  name: string;
  balance: number;
};

type QuickAction = {
  title: string;
  amount: number;
  type: "income" | "expense";
  wallet_id?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  wallets: Wallet[];
  quickAction?: QuickAction | null;
  onSuccess?: () => void;
};

export default function TransactionModal({
  open,
  onClose,
  wallets,
  quickAction,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // AUTO FILL from Quick Action (like your web app)
  useEffect(() => {
    if (quickAction) {
      setTitle(quickAction.title || "");
      setAmount(String(quickAction.amount || ""));
      setType(quickAction.type);
      if (quickAction.wallet_id) setWalletId(quickAction.wallet_id);
    }
  }, [quickAction]);

  async function handleSubmit() {
    if (!title || !amount || !walletId) return;

    try {
      setLoading(true);

      await createTransaction({
        wallet_id: walletId,
        title,
        amount: Number(amount),
        type,
        note: note || undefined,
      });

      // reset
      setTitle("");
      setAmount("");
      setNote("");
      setWalletId("");

      onSuccess?.();
      onClose();
    } catch (err) {
      console.log("Transaction error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={open} animationType="slide" transparent>
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-5 max-h-[85%]">
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* HEADER */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">
                Add Transaction
              </Text>

              <Pressable onPress={onClose}>
                <Text className="text-gray-500">Close</Text>
              </Pressable>
            </View>

            {/* TYPE */}
            <View className="flex-row gap-2 mb-3">
              <Pressable
                onPress={() => setType("expense")}
                className={`flex-1 p-2 border rounded ${
                  type === "expense" ? "bg-red-500" : ""
                }`}
              >
                <Text className={type === "expense" ? "text-white text-center" : "text-center"}>
                  Expense
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setType("income")}
                className={`flex-1 p-2 border rounded ${
                  type === "income" ? "bg-green-500" : ""
                }`}
              >
                <Text className={type === "income" ? "text-white text-center" : "text-center"}>
                  Income
                </Text>
              </Pressable>
            </View>

            {/* TITLE */}
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              className="border p-2 rounded mb-2"
            />

            {/* AMOUNT */}
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={(t) => setAmount(t.replace(/\D/g, ""))}
              keyboardType="numeric"
              className="border p-2 rounded mb-2"
            />

            {/* NOTE */}
            <TextInput
              placeholder="Note (optional)"
              value={note}
              onChangeText={setNote}
              className="border p-2 rounded mb-2"
            />

            {/* WALLET SELECT */}
            <Text className="font-semibold mt-2 mb-2">
              Select Wallet
            </Text>

            {wallets.map((w) => (
              <Pressable
                key={w.id}
                onPress={() => setWalletId(w.id)}
                className={`p-3 border rounded mb-2 ${
                  walletId === w.id ? "bg-black" : ""
                }`}
              >
                <Text className={walletId === w.id ? "text-white" : ""}>
                  {w.name}
                </Text>
              </Pressable>
            ))}

            {/* SUBMIT */}
            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              className="bg-black p-3 rounded mt-3"
            >
              <Text className="text-white text-center">
                {loading ? "Saving..." : "Add Transaction"}
              </Text>
            </Pressable>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}