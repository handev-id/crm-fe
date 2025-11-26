"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Channel Bar Chart";

const chartData = [
  { channel: "Facebook", total: 320, color: "#1877F2" },
  { channel: "Instagram", total: 280, color: "#F56040" },
  { channel: "Whatsapp", total: 450, color: "#25D366" },
  { channel: "Website", total: 150, color: "#4F46E5" },
];

const chartConfig = {
  total: {
    label: "Messages",
  },
} satisfies ChartConfig;

export function ChartBarDefault() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Messages</CardTitle>
        <CardDescription>Distribution per channel</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="channel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="total" />}
            />
            <Bar dataKey="total" radius={8}>
              {chartData.map((item, i) => (
                <Cell key={i} fill={item.color} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing message count per channel
        </div>
      </CardFooter>
    </Card>
  );
}
