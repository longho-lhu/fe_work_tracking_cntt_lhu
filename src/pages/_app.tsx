import AuthProvider from "@/context/AuthContext";
import type { AppProps } from "next/app";
import '@/styles/main.scss'
import NotiProvider from "@/context/Notification";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotiProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NotiProvider>
  );
}
