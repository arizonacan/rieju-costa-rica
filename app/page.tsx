import Hero from "./components/hero"; 
import { SpeedInsights } from "@vercel/speed-insights/next"
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
    </main>
  );
}