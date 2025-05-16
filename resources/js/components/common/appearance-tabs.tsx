import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appearance, useAppearance } from "@/hooks/use-appearance";
import { cn } from "@/libs/clsx";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceToggleTab({
  className = "",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const { appearance, updateAppearance } = useAppearance();

  const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <Tabs
      className={className}
      onValueChange={updateAppearance as (value: string) => void}
      value={appearance}
      {...props}
    >
      <TabsList className="bg-neutral-100 dark:bg-neutral-800">
        {tabs.map(({ value, icon: Icon, label }) => (
          <TabsTrigger
            className={cn(
              "flex items-center data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 dark:data-[state=active]:text-neutral-100",
              "data-[state=inactive]:text-neutral-500 dark:data-[state=inactive]:text-neutral-400",
              "hover:bg-neutral-200/60 hover:text-black dark:hover:bg-neutral-700/60",
            )}
            key={value}
            value={value}
          >
            <Icon className="mr-1.5 h-4 w-4" />
            <span className="text-sm">{label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
