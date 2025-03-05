import AuthProvider from "@/context/AuthContext";
import type { AppProps } from "next/app";
import '@/styles/main.scss'
import '../../node_modules/bootstrap/scss/bootstrap.scss';
import NotiProvider from "@/context/Notification";
import HeaderLayout from "@/layout/header";
import BodyProvider from "@/context/BodyContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotiProvider>
      <AuthProvider>
        <BodyProvider>
          <Component {...pageProps} />
        </BodyProvider>
      </AuthProvider>
    </NotiProvider>
  );
}
