import { useAuth } from "@/context/AuthContext";
import useAuthGuard from "@/hoc/withAuth";
import withAuth from "@/hoc/withAuth";
import BodyPage from "@/layout/body";
import HeaderLayout from "@/layout/header";
import Head from "next/head";

const Home = () => {
  useAuthGuard(['ADMIN', 'USER']);
  return (
    <>
      <Head>
        <title>Internship Tracking v1.0</title>
        <meta name="description" content="A application support for tracking work time of student in faculty of information technology LHU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo256px.jpg" />
      </Head>
      <HeaderLayout />
      <BodyPage />
    </>
  );
}

export default Home