import Layout from "./layout";
import { StatsCard } from "./components/dashboard/stats-card";
import { TransactionsByTypeChart } from "./components/dashboard/transactions-by-type-chart";
import { TransactionsByCategoryChart } from "./components/dashboard/transactions-by-category-chart";
import { AmountOverviewChart } from "./components/dashboard/amount-overview-chart";
import { ArrowUpCircle, ArrowDownCircle, DollarSign, TrendingUp } from "lucide-react";
import type { Transaction } from "./types/transaction";
import { TransactionType } from "./types/transaction";

// Dados mockados - substitua isso pela chamada ao seu backend
const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salário",
    amount: 5000,
    type: TransactionType.INCOME,
    categoryId: "1",
    createdAt: new Date("2025-10-01"),
  },
  {
    id: "2",
    title: "Freelance",
    amount: 1500,
    type: TransactionType.INCOME,
    categoryId: "2",
    createdAt: new Date("2025-10-05"),
  },
  {
    id: "3",
    title: "Aluguel",
    amount: 1200,
    type: TransactionType.EXPENSE,
    categoryId: "3",
    createdAt: new Date("2025-10-10"),
  },
  {
    id: "4",
    title: "Supermercado",
    amount: 450,
    type: TransactionType.EXPENSE,
    categoryId: "4",
    createdAt: new Date("2025-10-12"),
  },
  {
    id: "5",
    title: "Internet",
    amount: 100,
    type: TransactionType.EXPENSE,
    categoryId: "5",
    createdAt: new Date("2025-10-15"),
  },
  {
    id: "6",
    title: "Academia",
    amount: 80,
    type: TransactionType.EXPENSE,
    categoryId: "6",
    createdAt: new Date("2025-10-18"),
  },
  {
    id: "7",
    title: "Restaurante",
    amount: 150,
    type: TransactionType.EXPENSE,
    categoryId: "4",
    createdAt: new Date("2025-10-20"),
  },
];

const mockCategories = {
  "1": "Salário",
  "2": "Freelance",
  "3": "Moradia",
  "4": "Alimentação",
  "5": "Contas",
  "6": "Saúde",
};

function App() {
  // Cálculos baseados nos dados mockados
  const incomeTransactions = mockTransactions.filter(
    (t) => t.type === TransactionType.INCOME
  );
  const expenseTransactions = mockTransactions.filter(
    (t) => t.type === TransactionType.EXPENSE
  );

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  // Dados para o gráfico de categorias
  const categoryData = Object.entries(
    mockTransactions.reduce((acc, t) => {
      const categoryName = mockCategories[t.categoryId as keyof typeof mockCategories] || "Outros";
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, count]) => ({
    category,
    count,
    fill: "",
  }));

  // Dados mockados para o gráfico mensal
  const monthlyData = [
    { month: "Jun", income: 4500, expense: 2800 },
    { month: "Jul", income: 5200, expense: 3200 },
    { month: "Ago", income: 4800, expense: 2900 },
    { month: "Set", income: 5500, expense: 3400 },
    { month: "Out", income: totalIncome, expense: totalExpense },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-4 px-2 sm:px-0">
        <div className="pt-5 pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Visão geral das suas transações financeiras
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total de Entradas"
            value={incomeTransactions.length.toString()}
            icon={ArrowUpCircle}
            iconColor="text-[var(--color-income)]"
            description={`R$ ${totalIncome.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`}
          />
          <StatsCard
            title="Total de Saídas"
            value={expenseTransactions.length.toString()}
            icon={ArrowDownCircle}
            iconColor="text-[var(--color-expense)]"
            description={`R$ ${totalExpense.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`}
          />
          <StatsCard
            title="Saldo"
            value={`R$ ${balance.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}`}
            icon={DollarSign}
            iconColor={balance >= 0 ? "text-[var(--color-income)]" : "text-[var(--color-expense)]"}
            description={balance >= 0 ? "Positivo" : "Negativo"}
          />
          <StatsCard
            title="Total de Transações"
            value={mockTransactions.length.toString()}
            icon={TrendingUp}
            description="Este mês"
          />
        </div>

        {/* Gráficos */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <TransactionsByTypeChart
            incomeCount={incomeTransactions.length}
            expenseCount={expenseTransactions.length}
          />
          <TransactionsByCategoryChart data={categoryData} />
        </div>

        <div className="w-full">
          <AmountOverviewChart data={monthlyData} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
