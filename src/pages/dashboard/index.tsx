import { ChannelPieChart } from "@/pages/dashboard/channel-pie-chart";
import { ConversationTrafficChart } from "@/pages/dashboard/conversation-traffic-chart";
import { MetricCard } from "@/pages/dashboard/metric-card";
import { MessageSquare, AlertCircle, Users, UserCheck } from "lucide-react";

export default function Dashboard() {
  const metricsData = [
    {
      title: "Total Pesan Masuk",
      value: "1,248",
      icon: <MessageSquare className="w-5 h-5" />,
      trend: { value: 12.5, isPositive: true },
      subtitle: "Hari ini",
      status: "default" as const,
    },
    {
      title: "Belum Direspon",
      value: "23",
      icon: <AlertCircle className="w-5 h-5" />,
      trend: { value: 8.2, isPositive: false },
      subtitle: "Perlu perhatian segera",
      status: "danger" as const,
    },
    {
      title: "Percakapan Aktif",
      value: "156",
      icon: <Users className="w-5 h-5" />,
      trend: { value: 5.3, isPositive: true },
      subtitle: "Ongoing conversations",
      status: "warning" as const,
    },
    {
      title: "CS Agent Online",
      value: "8/12",
      icon: <UserCheck className="w-5 h-5" />,
      subtitle: "Tersedia saat ini",
      status: "success" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metricsData.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="flex gap-6">
        <div className="w-full lg:w-[70%] h-[400px]">
          <ConversationTrafficChart />
        </div>
        <div className="w-full lg:w-[30%]">
          <ChannelPieChart />
        </div>
      </div>
    </div>
  );
}
