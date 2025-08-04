import Achievement from "../components/Achievement";
import Hero from "../components/Hero";
import RecentListing from "../components/RecentListing";
import Wwd from "../components/Wwd";

export default function Home() {
  return (
    <main>
      <Hero />
      <Achievement />
      <RecentListing />
      <Wwd />
    </main>
  );
}
