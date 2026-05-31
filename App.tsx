import "./global.css";
import { Image, ScrollView, View, Text, Pressable } from "react-native";
import { useEffect, useMemo, useState } from "react";

import { useFinanceStore } from "@/store/financeStore";
import { useTransactionStore } from "@/store/transactionStore";
import { initDatabase } from "@/database/init";

// MODALS (same concept as web)
// import AddWalletModal from "@/components/modals/AddWalletModal";
import TransactionModal from "@/components/modals/TransactionModal";
// import DeleteWalletModal from "@/components/modals/DeleteWalletModal";
// import DeleteTrxModal from "@/components/modals/DeleteTrxModal";
// import MonthSyncModal from "@/components/modals/MonthSyncModal";

export default function App() {
  // =====================
  // STORE
  // =====================
  const wallets = useFinanceStore((s) => s.wallets);
  const loadWallets = useFinanceStore((s) => s.loadWallets);
  const removeWallet = useFinanceStore((s) => s.removeWallet);

  const transactions = useTransactionStore((s) => s.transactions);
  const loadTransactions = useTransactionStore((s) => s.loadTransactions);
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction);

  // =====================
  // LOCAL STATE (WEB STYLE)
  // =====================
  const [selectedQuickAction, setSelectedQuickAction] = useState<any>(null);
  const [trxMonthFilter, setTrxMonthFilter] = useState("all");
  const [trxTypeFilter, setTrxTypeFilter] = useState("all");
  const [trxLimit, setTrxLimit] = useState(10);

  // MODALS
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showTrxModal, setShowTrxModal] = useState(false);
  const [showDeleteWalletModal, setShowDeleteWalletModal] = useState(false);
  const [showDeleteTrxModal, setShowDeleteTrxModal] = useState(false);
  const [showMonthSyncModal, setShowMonthSyncModal] = useState(false);

  // =====================
  // INIT
  // =====================
  useEffect(() => {
    initDatabase();
    loadWallets();
    loadTransactions();
  }, []);

  // =====================
  // FORMAT
  // =====================
  const formatIDR = (v: number) =>
    new Intl.NumberFormat("id-ID").format(v || 0);

  // =====================
  // MONTH SYSTEM (WEB STYLE)
  // =====================
  const monthId = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }, []);

  const availableMonths = useMemo(() => {
    const set = new Set(
      transactions.map((t) => {
        const d = new Date(t.created_at);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    );
    return ["all", ...Array.from(set).sort().reverse()];
  }, [transactions]);

  // =====================
  // FILTERED TRANSACTIONS (WEB LOGIC)
  // =====================
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const d = new Date(t.created_at);
      const id = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

      const matchMonth = trxMonthFilter === "all" || id === trxMonthFilter;
      const matchType = trxTypeFilter === "all" || t.type === trxTypeFilter;

      return matchMonth && matchType;
    });
  }, [transactions, trxMonthFilter, trxTypeFilter]);

  const displayedTransactions = useMemo(() => {
    return filteredTransactions.slice(0, trxLimit);
  }, [filteredTransactions, trxLimit]);

  // =====================
  // TOTALS (WEB STYLE)
  // =====================
  const totalBalance = useMemo(
    () => wallets.reduce((a, w) => a + Number(w.balance || 0), 0),
    [wallets]
  );

  const totalIncome = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "income")
        .reduce((a, t) => a + Number(t.amount), 0),
    [filteredTransactions]
  );

  const totalExpense = useMemo(
    () =>
      filteredTransactions
        .filter((t) => t.type === "expense")
        .reduce((a, t) => a + Number(t.amount), 0),
    [filteredTransactions]
  );

  const feePercent = 2.5;
  const feeExpense = Math.round((totalIncome * feePercent) / 100);

  // =====================
  // QUICK ACTION (LOCAL LIKE FIRESTORE VERSION)
  // =====================
  const quickActions = useMemo(() => {
    return [
      { id: "1", title: "Coffee", amount: 15000, type: "expense" },
      { id: "2", title: "Salary", amount: 5000000, type: "income" },
      { id: "3", title: "Salary", amount: 5000000, type: "income" },
      { id: "4", title: "Salary", amount: 5000000, type: "income" },
    ];
  }, []);

  return (
    <ScrollView className="flex-1 bg-[#f5f7fb] p-4">

    <View className="bg-white p-8 rounded-2xl m-8 mt-[80px]">

      {/* HEADER */}
      <View className="flex-row justify-start gap-5 items-center mb-4">
        <Image source={require("@/assets/icon.png")} style={{ width: 32, height: 32 }} />

        <Text>Halo 👋</Text>
      </View>

      {/* ===================== WALLET ===================== */}
      <View className="bg-white border rounded-2xl p-4 mb-4">
        <View className="flex-row justify-between mb-3">
          <Text className="text-xl font-bold">Wallets</Text>

          <Pressable  onPress={() => setShowWalletModal(true)}>
            <Text className="bg-black text-white font-bold px-4 py-2 rounded-2xl">+ New</Text>
          </Pressable>
        </View>

        {wallets.map((w) => (
          <View key={w.id} className="mb-2">
            <Text className="text-gray-500">{w.name}</Text>
            <Text className="text-xl font-bold">
              Rp {formatIDR(w.balance)}
            </Text>
          </View>
        ))}
      </View>

      {/* ===================== QUICK ACTIONS (WEB STYLE) ===================== */}
      <View className="bg-white border rounded-2xl p-4 mb-4">

        <View className="flex-row justify-between mb-3">
          <Text className="text-xl font-bold">Quick Actions</Text>

          <Pressable onPress={() => setShowTrxModal(true)}>
            <Text className="bg-black text-white font-bold px-4 py-2 rounded-2xl">+ New</Text>
          </Pressable>
        </View>

        <View className="flex-row flex-wrap -mx-1">
          {quickActions.map((q) => (
            <Pressable
              key={q.id}
              onPress={() => {
                setSelectedQuickAction(q);
                setShowTrxModal(true);
              }}
              className="w-1/2 px-1 mb-2"
            >
              <View className="border p-3 rounded-xl">
                <Text className="font-semibold">{q.title}</Text>

                <Text className={q.type === "income" ? "text-green-500" : "text-red-500"}>
                  {q.type === "income" ? "+" : "-"} Rp {formatIDR(q.amount)}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>



      </View>



      {/* ===================== RECENT TRANSACTIONS (WEB STYLE) ===================== */}
      <View className="bg-white border rounded-2xl p-4 mb-4">

        <View className="flex-row justify-between mb-2">
          <Text className="text-xl font-bold">Recent Transactions</Text>

          <Pressable onPress={() => setShowTrxModal(true)}>
            <Text className="bg-black text-white font-bold px-4 py-2 rounded-2xl">+ Add</Text>
          </Pressable>
        </View>

        {/* FILTERS */}
        <View className="flex-row gap-2 mb-3">

          <Pressable
            onPress={() => setTrxMonthFilter("all")}
            className="border px-2 py-1 rounded"
          >
            <Text>All</Text>
          </Pressable>

          <Pressable
            onPress={() => setTrxTypeFilter("income")}
            className="border px-2 py-1 rounded"
          >
            <Text>Income</Text>
          </Pressable>

          <Pressable
            onPress={() => setTrxTypeFilter("expense")}
            className="border px-2 py-1 rounded"
          >
            <Text>Expense</Text>
          </Pressable>
        </View>

        <Text className="text-xs text-gray-400 mb-2">
          Showing {displayedTransactions.length} of {filteredTransactions.length}
        </Text>

        {displayedTransactions.map((trx) => (
          <View key={trx.id} className="border p-3 rounded-xl mb-2 relative">

            <Text className="font-semibold">{trx.title}</Text>

            <Text className="text-xs text-gray-500">
              {new Date(trx.created_at).toLocaleString()}
            </Text>

            <Text className={trx.type === "income" ? "text-green-500" : "text-red-500"}>
              {trx.type} Rp {formatIDR(trx.amount)}
            </Text>

            <Pressable
              onPress={() => deleteTransaction(trx.id)}
              className="absolute right-2 top-2"
            >
              <Text>🗑️</Text>
            </Pressable>

          </View>
        ))}
      </View>


            {/* ===================== MONTHLY OVERVIEW ===================== */}
      <View className="bg-white border rounded-2xl p-4 mb-4">

        <Text className="text-xl font-bold">Monthly Overview</Text>
        <Text className="text-gray-500 mb-4 mt-2">{monthId}</Text>

        <Text>Balance: Rp {formatIDR(totalBalance)}</Text>
        <Text className="text-green-500">Income: +Rp {formatIDR(totalIncome)}</Text>
        <Text className="text-red-500">Expense: -Rp {formatIDR(totalExpense)}</Text>
        <Text className="text-purple-500">
          Fee ({feePercent}%): Rp {formatIDR(feeExpense)}
        </Text>

        <Pressable
          onPress={() => setShowMonthSyncModal(true)}
          className="bg-black p-3 rounded-xl mt-3"
        >
          <Text className="text-white text-center">Sync Month</Text>
        </Pressable>
      </View>

      {/* =========================
      MONTH HISTORY (LOCAL SNAPSHOT)
      ========================= */}
      <View className="bg-white border p-4 rounded-2xl mb-4">
        <Text className="text-xl font-bold mb-2">Monthly History</Text>

        <Text className="text-gray-400 text-xs">
          (you can connect this to local DB table "monthly snapshots")
        </Text>
      </View>

      {/* ===================== MODALS ===================== */}

      {/* <AddWalletModal open={showWalletModal} onClose={() => setShowWalletModal(false)} /> */}

      <TransactionModal
        open={showTrxModal}
        onClose={() => {
          setShowTrxModal(false);
          setSelectedQuickAction(null);
        }}
        wallets={wallets}
        quickAction={selectedQuickAction}
      />
{/* 
      <DeleteWalletModal
        open={showDeleteWalletModal}
        onClose={() => setShowDeleteWalletModal(false)}
        wallets={wallets}
      />

      <DeleteTrxModal
        open={showDeleteTrxModal}
        onClose={() => setShowDeleteTrxModal(false)}
        transactions={transactions}
      />

      <MonthSyncModal
        open={showMonthSyncModal}
        onClose={() => setShowMonthSyncModal(false)}
        data={{
          month: monthId,
          totalBalance,
          totalIncome,
          totalExpense,
          feePercent,
          feeExpense,
        }}
      /> */}

    </View>

    </ScrollView>
  );
}