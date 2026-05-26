import "./global.css";
import { Image } from 'react-native';
import { useEffect, useState } from "react";
import { ScrollView, View, Text, TextInput, Pressable } from "react-native";

import { useFinanceStore } from "@/store/financeStore";
import { useTransactionStore } from "@/store/transactionStore";

import { initDatabase } from "@/database/init";

export default function App() {
  const wallets = useFinanceStore((s) => s.wallets);
  const loadWallets = useFinanceStore((s) => s.loadWallets);
  const addWallet = useFinanceStore((s) => s.addWallet);
  const removeWallet = useFinanceStore((s) => s.removeWallet);

  const transactions = useTransactionStore((s) => s.transactions);
  const loadTransactions = useTransactionStore((s) => s.loadTransactions);
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [walletId, setWalletId] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const [walletName, setWalletName] = useState("");
  const [walletBalance, setWalletBalance] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("all");

  useEffect(() => {
    initDatabase();
    loadWallets();
    loadTransactions();
  }, []);

  const refreshData = async () => {
    await loadWallets();
    await loadTransactions();
  };

  // Biar number viewable
  const formatIDR = (value: number) => new Intl.NumberFormat("id-ID").format(value);
  const formatNumber = (value: string) => {
    const clean = value.replace(/\D/g, "");
    if (!clean) return "";
    return new Intl.NumberFormat("id-ID").format(Number(clean));
  };

  // MONTH LIST
  const availableMonths = [
    "all",
    ...Array.from(
      new Set(
        transactions.map((t) => {
          const d = new Date(t.created_at);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        })
      )
    ).sort().reverse(),
  ];

  // FILTER
  const filteredTransactions =
    selectedMonth === "all"
      ? transactions
      : transactions.filter((t) => {
          const d = new Date(t.created_at);
          const id = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          return id === selectedMonth;
        });



// USE REAL DB BALANCE ONLY
const walletBalances = wallets.map((w) => ({
  ...w,
  balance: Number(w.balance || 0),
}));

  // TOTALS
  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + Number(t.amount), 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount), 0);

  const totalBalance = walletBalances.reduce(
    (acc, w) => acc + Number(w.balance || 0),
    0
  );

  async function handleAddTransaction() {
    if (!title || !amount || !walletId) return;

    await addTransaction({
      wallet_id: walletId,
      title,
      amount: Number(amount),
      type,
    });

    await refreshData(); // 🔥 important

    setTitle("");
    setAmount("");
  }

  async function handleAddWallet() {
    if (!walletName) return;

    await addWallet(walletName, Number(walletBalance || 0));

    await refreshData(); // 🔥 important

    setWalletName("");
    setWalletBalance("");
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        padding: 24,
        paddingTop: 48,
        paddingBottom: 120,
        flexGrow: 1,
      }}
    >

      <Image source={require('@/assets/icon.png')} style={{ width: 100, height: 100 }}
    />

      {/* WALLET SECTION */}
      <View className="mt-4 border border-black p-6 rounded-2xl">
        <Text className="font-bold text-lg mb-4">Wallets</Text>

        {/* ADD WALLET */}
        <TextInput
          placeholder="Wallet name"
          value={walletName}
          onChangeText={setWalletName}
          className="border p-2 rounded mb-2"
        />

        <TextInput
          placeholder="Starting balance"
          value={formatNumber(walletBalance)}
          onChangeText={(text) => {
            const clean = text.replace(/\D/g, "");
            setWalletBalance(clean);
          }}
          keyboardType="numeric"
          className="border p-2 rounded mb-2"
        />

        <Pressable
          onPress={handleAddWallet}
          className="bg-black p-3 rounded mb-4"
        >
          <Text className="text-white text-center">Add Wallet</Text>
        </Pressable>

        {walletBalances.map((w) => (
          <View key={w.id} className="p-3 border rounded mb-2 relative">

            <Text className="font-bold text-lg">{w.name}</Text>
            <Text>Rp {formatIDR(w.balance)}</Text>

            <Pressable
              onPress={() => removeWallet(w.id)}
              className="absolute right-2 top-2 border border-red-700 bg-white-500 px-2 py-1 rounded"
            >
              <Text className="text-xs">🗑️</Text>
            </Pressable>

          </View>
        ))}
      </View>

      {/* DASHBOARD */}
      <View className="mt-4 border border-black p-6 rounded-2xl">
        <Text className="font-bold text-lg mb-2">
          Overview ({selectedMonth})
        </Text>

        <View className="flex-row flex-wrap gap-2 mb-3">
          {availableMonths.map((m) => (
            <Pressable
              key={m}
              onPress={() => setSelectedMonth(m)}
              className={`px-3 py-1 border rounded ${
                selectedMonth === m ? "bg-black" : ""
              }`}
            >
              <Text className={selectedMonth === m ? "text-white" : ""}>
                {m}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text className="text-green-600">
          Income: Rp {formatIDR(totalIncome)}
        </Text>

        <Text className="text-red-600">
          Expense: Rp {formatIDR(totalExpense)}
        </Text>

        <Text className="font-bold mt-2 text-lg">
          Balance: Rp {formatIDR(totalBalance)},-
        </Text>
      </View>

      {/* ADD TRANSACTION */}
      <View className="mt-4 border border-black p-6 rounded-2xl">

        <Text className="text-xl font-bold mb-4">
          Add Transaction
        </Text>

        {/* TYPE */}
        <View className="flex-row gap-2 mb-3">
          <Pressable
            onPress={() => setType("expense")}
            className={`flex-1 p-2 rounded border ${
              type === "expense" ? "bg-red-500" : ""
            }`}
          >
            <Text className={type === "expense" ? "text-white text-center" : "text-center"}>
              Expense
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setType("income")}
            className={`flex-1 p-2 rounded border ${
              type === "income" ? "bg-green-500" : ""
            }`}
          >
            <Text className={type === "income" ? "text-white text-center" : "text-center"}>
              Income
            </Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          className="border p-2 rounded mb-2"
        />

        <TextInput
          placeholder="Harga / Amount"
          value={formatNumber(amount)}
          onChangeText={(text) => {
            const clean = text.replace(/\D/g, "");
            setAmount(clean);
          }}
          keyboardType="numeric"
          className="border p-2 rounded mb-2"
        />

        

        <Text className="mb-2 font-semibold mt-2">Select Wallet</Text>

        {walletBalances.map((w) => (
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

        <Pressable
          onPress={handleAddTransaction}
          className="bg-black p-3 rounded mt-2"
        >
          <Text className="text-white text-center">
            Add Transaction
          </Text>
        </Pressable>
      </View>

      {/* TRANSACTIONS */}
      <View className="mt-4 border border-black p-6 rounded-2xl">
        <Text className="text-lg font-bold">Transactions</Text>

        {Object.keys(
          filteredTransactions.reduce((groups, t) => {
            const date = new Date(t.created_at).toISOString().split("T")[0];
            if (!groups[date]) groups[date] = [];
            groups[date].push(t);
            return groups;
          }, {} as Record<string, typeof transactions>)
        )
          .sort((a, b) => (a < b ? 1 : -1))
          .map((date) => (
            <View key={date} className="mt-4">
              <Text className="text-sm font-bold text-gray-500 mb-2">
                {date}
              </Text>

              {filteredTransactions
                .filter((t) => t.created_at.startsWith(date))
                .map((t) => (
                  <View key={t.id} className="border p-3 mb-2 rounded">
                    <Text className="font-bold">{t.title}</Text>

                    <Text className="text-xs text-gray-500">
                      {new Date(t.created_at).toLocaleString()}
                    </Text>

                    <Text className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                      {t.type} - Rp {formatIDR(t.amount)}
                    </Text>

                    <Pressable
                      onPress={() => deleteTransaction(t.id)}
                      className="absolute right-2 top-2 border border-red-700 bg-white-500 px-2 py-1 rounded"
                    >
                      <Text className="text-xs">🗑️</Text>
                    </Pressable>

                  </View>
                ))}
            </View>
          ))}
      </View>

    </ScrollView>
  );
}