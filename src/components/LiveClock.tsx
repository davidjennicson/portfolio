import { useState, useEffect } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [location, setLocation] = useState("Local");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data.timezone) setTimezone(data.timezone);
        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}`);
        }
      } catch (err) {
        console.error("Failed to fetch location", err);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  });

  return (
    <span className="font-mono text-muted-foreground text-sm tracking-widest uppercase">
      {location} — {formatted} ({timezone})
    </span>
  );
};

export default LiveClock;