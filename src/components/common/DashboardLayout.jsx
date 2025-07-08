import { ScrollArea } from "@/components/ui/scroll-area";

const DashboardLayout = ({ title, children }) => {
  return (
    <ScrollArea className="h-screen">
      <main className="py-6 bg-[#F7F7FF]">
        <h1 className="text-center text-2xl font-bold text-black/70">
          {title}
        </h1>
        {children}
      </main>
    </ScrollArea>
  );
};

export default DashboardLayout;
