import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: "default" | "warning" | "danger" | "success";
  subtitle?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  trend,
  status = "default",
  subtitle,
}: MetricCardProps) {
  const iconColors = {
    default: "text-blue-600 bg-blue-50",
    warning: "text-yellow-600 bg-yellow-50",
    danger: "text-red-600 bg-red-50",
    success: "text-green-600 bg-green-50",
  };

  return (
    <Card
      className={`hover:shadow-lg transition-shadow ${
        status === "danger" ? "border-destructive" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${iconColors[status]}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{value}</div>
        {subtitle && (
          <CardDescription className="text-xs mb-2">{subtitle}</CardDescription>
        )}
        {trend && (
          <div className="flex items-center gap-1">
            <Badge
              variant={trend.isPositive ? "default" : "destructive"}
              className="text-xs px-1.5 py-0"
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {Math.abs(trend.value)}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs kemarin</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
