import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface AmountOverviewChartProps {
  data: MonthlyData[];
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

export function AmountOverviewChart({ data }: AmountOverviewChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral - Valores Mensais</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full min-w-0">
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="a"
            />
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

