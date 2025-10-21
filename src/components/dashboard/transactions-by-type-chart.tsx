import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface TransactionsByTypeChartProps {
  incomeCount: number;
  expenseCount: number;
}

const chartConfig = {
  income: {
    label: "Entradas",
    color: "hsl(142, 76%, 36%)", // Verde
  },
  expense: {
    label: "Saídas",
    color: "hsl(0, 84%, 60%)", // Vermelho
  },
} satisfies ChartConfig;

export function TransactionsByTypeChart({
  incomeCount,
  expenseCount,
}: TransactionsByTypeChartProps) {
  const chartData = [
    {
      type: "Transações",
      income: incomeCount,
      expense: expenseCount,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações por Tipo</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full min-w-0">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

