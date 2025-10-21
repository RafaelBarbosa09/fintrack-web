import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  iconColor = "text-muted-foreground",
}: StatsCardProps) {
  return (
    <Card className="min-w-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium truncate">{title}</CardTitle>
        <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${iconColor} flex-shrink-0`} />
      </CardHeader>
      <CardContent>
        <div className="text-lg sm:text-2xl font-bold truncate">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground truncate">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

