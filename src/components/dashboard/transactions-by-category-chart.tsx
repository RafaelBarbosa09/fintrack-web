import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

interface CategoryData {
  category: string;
  count: number;
  fill: string;
}

interface TransactionsByCategoryChartProps {
  data: CategoryData[];
}

export function TransactionsByCategoryChart({
  data,
}: TransactionsByCategoryChartProps) {
  const colors = [
    "hsl(142, 76%, 36%)", // Verde
    "hsl(221, 83%, 53%)", // Azul
    "hsl(0, 84%, 60%)",   // Vermelho
    "hsl(48, 96%, 53%)",  // Amarelo
    "hsl(262, 83%, 58%)", // Roxo
    "hsl(173, 58%, 39%)", // Teal
    "hsl(25, 95%, 53%)",  // Laranja
  ];

  const chartConfig = data.reduce((config, item, index) => {
    config[item.category] = {
      label: item.category,
      color: colors[index % colors.length],
    };
    return config;
  }, {} as ChartConfig);

  const chartData = data.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full min-w-0">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="category"
              innerRadius={50}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.fill }}
              />
              <span className="truncate">{item.category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

