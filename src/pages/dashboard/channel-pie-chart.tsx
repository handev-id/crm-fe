"use client";

import { Facebook, Instagram, MessageCircle, Globe } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";

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

export const description = "CRM Pie Chart with Icons";

const chartData = [
  {
    key: "facebook",
    label: "Facebook",
    value: 320,
    color: "#1877F2",
    icon: Facebook,
  },
  {
    key: "instagram",
    label: "Instagram",
    value: 280,
    color: "#E4405F",
    icon: Instagram,
  },
  {
    key: "whatsapp",
    label: "Whatsapp",
    value: 450,
    color: "#25D366",
    icon: MessageCircle,
  },
  {
    key: "website",
    label: "Website",
    value: 150,
    color: "#7C3AED",
    icon: Globe,
  },
];

const chartConfig = {
  value: {
    label: "Messages",
  },
} satisfies ChartConfig;

export function ChannelPieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Channel Distribution</CardTitle>
        <CardDescription>Message percentage per channel</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="value" />} />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              stroke="none"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 1.25;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                const Icon = chartData[index].icon;

                return (
                  <foreignObject x={x - 10} y={y - 10} width={24} height={24}>
                    <div className="flex items-center justify-center">
                      <Icon size={20} color={chartData[index].color} />
                    </div>
                  </foreignObject>
                );
              }}
            >
              {chartData.map((item, i) => (
                <Cell key={i} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Distribution of total incoming messages
      </CardFooter>
    </Card>
  );
}
