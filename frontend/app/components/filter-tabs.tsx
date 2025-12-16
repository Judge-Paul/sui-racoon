import { useState, useRef, useEffect } from "react";
import { cn } from "~/lib/utils";

interface FilterTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [hoverStyle, setHoverStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeStyle, setActiveStyle] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    if (hoveredTab && tabRefs.current[hoveredTab] && containerRef.current) {
      const tab = tabRefs.current[hoveredTab];
      const container = containerRef.current;
      const tabRect = tab!.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setHoverStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
        opacity: 1,
      });
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredTab]);

  useEffect(() => {
    if (activeTab && tabRefs.current[activeTab] && containerRef.current) {
      const tab = tabRefs.current[activeTab];
      const container = containerRef.current;
      const tabRect = tab!.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setActiveStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
      onMouseLeave={() => setHoveredTab(null)}
    >
      <div
        className="absolute h-[calc(100%-8px)] rounded-full bg-white/10 transition-all duration-300 ease-out"
        style={{
          left: hoverStyle.left,
          width: hoverStyle.width,
          opacity: hoverStyle.opacity,
          top: 4,
        }}
      />
      <div
        className="absolute h-[calc(100%-8px)] rounded-full bg-blue-600 shadow-sm transition-all duration-300 ease-out"
        style={{
          left: activeStyle.left,
          width: activeStyle.width,
          top: 4,
        }}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[tab] = el;
          }}
          onClick={() => onTabChange(tab)}
          onMouseEnter={() => setHoveredTab(tab)}
          className={cn(
            "relative z-10 h-9 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors duration-200",
            activeTab === tab
              ? "text-white"
              : "text-slate-400 hover:text-white",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
