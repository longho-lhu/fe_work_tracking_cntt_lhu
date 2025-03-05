import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import BodyPage from "@/layout/body";
import HeaderLayout from "@/layout/header";
import Head from "next/head";

const Home = () => {
  const { deleteTokenAndUser } = useAuth()
  return (
    <>
      <Head>
        <title>Internship Tracking v1.0 by CNTT LHU</title>
        <meta name="description" content="a application support for tracking work time of student in faculty of information technology LHU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo256px.jpg" />
      </Head>
      <HeaderLayout />
      <BodyPage />
    </>
  );
}

export default Home