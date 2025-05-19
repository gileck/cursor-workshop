import { Geist, Geist_Mono } from "next/font/google";
import TodoApp from "./todo-app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen p-8 font-[family-name:var(--font-geist-sans)]`}
    >
      <TodoApp />
    </div>
  )
}