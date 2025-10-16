import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import AnnaBotpress from "../components/AnnaBotpress";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="container">
        <Navbar />
        <Component {...pageProps} />
      </div>
      <AnnaBotpress /> {/* Anna globale */}
    </>
  );
}
