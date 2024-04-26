import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="bg-[#000000]">
      <ToastContainer />
      <Navbar />
      <Hero />
    </main>
  );
}
