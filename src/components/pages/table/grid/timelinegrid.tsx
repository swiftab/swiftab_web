import { useEffect, useState } from "react";
import { formatTime } from "@/lib/time";

export function TimelineGrid() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const hours = Array.from({ length: 7 }, (_, i) => i + 11); // 11am to 5pm
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
  const startOfDay = 11 * 60; // 11am
  const currentTimePosition = ((currentMinutes - startOfDay) * 48) / 60;

  return (
    <div className="absolute inset-0">
      {/* Vertical time markers */}
      <div className="grid grid-cols-[auto,1fr] divide-y divide-border">
        {hours.map((hour) => (
          <div
            key={hour}
            className="grid grid-cols-[auto,1fr] divide-x divide-border"
          >
            <div className="sticky left-0 -mt-2.5 w-16 bg-background pr-2 text-right text-sm text-muted-foreground">
              {formatTime(hour * 60)}
            </div>
            <div className="h-12">
              {/* 15-minute markers */}
              <div className="grid h-full grid-cols-4">
                {[0, 1, 2, 3].map((quarter) => (
                  <div
                    key={quarter}
                    className="border-l border-border/50 first:border-l-0"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current time indicator */}
      {currentTimePosition > 0 && currentTimePosition < 360 && (
        <div
          className="absolute left-16 right-0 flex items-center"
          style={{ top: `${currentTimePosition}px` }}
        >
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-px flex-1 bg-red-500" />
        </div>
      )}
    </div>
  );
}
