import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageSquare } from "lucide-react";

const generateData = (days: number) => {
  const data = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      whatsapp: Math.floor(Math.random() * 200) + 100,
      instagram: Math.floor(Math.random() * 150) + 80,
      facebook: Math.floor(Math.random() * 120) + 60,
      webchat: Math.floor(Math.random() * 100) + 50,
    });
  }

  return data;
};

type PeriodType = "7" | "14" | "30" | "90" | "180";

export function ConversationTrafficChart() {
  const [period, setPeriod] = useState<PeriodType>("7");

  const periodOptions = [
    { value: "7", label: "Last 7 Days" },
    { value: "14", label: "Last 14 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 3 Months" },
    { value: "180", label: "Last 6 Months" },
  ];

  const data = generateData(parseInt(period));

  const totalMessages = data.reduce(
    (acc, day) =>
      acc + day.whatsapp + day.instagram + day.facebook + day.webchat,
    0
  );

  const avgPerDay = Math.floor(totalMessages / data.length);

  const halfPoint = Math.floor(data.length / 2);
  const firstHalf = data
    .slice(0, halfPoint)
    .reduce(
      (acc, day) =>
        acc + day.whatsapp + day.instagram + day.facebook + day.webchat,
      0
    );
  const secondHalf = data
    .slice(halfPoint)
    .reduce(
      (acc, day) =>
        acc + day.whatsapp + day.instagram + day.facebook + day.webchat,
      0
    );
  const trend = (((secondHalf - firstHalf) / firstHalf) * 100).toFixed(1);
  const isTrendPositive = parseFloat(trend) > 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce(
        (sum: number, entry: any) => sum + entry.value,
        0
      );

      return (
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{label}</CardTitle>
            <CardDescription className="text-xs">
              Total:{" "}
              <span className="font-semibold text-foreground">{total}</span>{" "}
              messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="capitalize">{entry.name}</span>
                </div>
                <span className="font-semibold">{entry.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                Chat Traffic Overview
              </CardTitle>
              <CardDescription>
                Monitor your omnichannel conversation volume across all
                platforms
              </CardDescription>
            </div>
            <Select
              value={period}
              onValueChange={(value) => setPeriod(value as PeriodType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">
                {totalMessages.toLocaleString()}
              </div>
              <Badge
                variant={isTrendPositive ? "default" : "destructive"}
                className="gap-1"
              >
                <TrendingUp
                  className={`w-3 h-3 ${!isTrendPositive ? "rotate-180" : ""}`}
                />
                {Math.abs(parseFloat(trend))}%
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Total Messages</div>
              <div>
                Avg:{" "}
                <span className="font-semibold text-foreground">
                  {avgPerDay}
                </span>
                /day
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="whatsapp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25D366" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#25D366" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="instagram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E4405F" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E4405F" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="facebook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1877F2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1877F2" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="webchat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Area
                type="monotone"
                dataKey="whatsapp"
                stackId="1"
                stroke="#25D366"
                fill="url(#whatsapp)"
                name="WhatsApp"
              />
              <Area
                type="monotone"
                dataKey="instagram"
                stackId="1"
                stroke="#E4405F"
                fill="url(#instagram)"
                name="Instagram"
              />
              <Area
                type="monotone"
                dataKey="facebook"
                stackId="1"
                stroke="#1877F2"
                fill="url(#facebook)"
                name="Facebook"
              />
              <Area
                type="monotone"
                dataKey="webchat"
                stackId="1"
                stroke="#7C3AED"
                fill="url(#webchat)"
                name="Web Chat"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
