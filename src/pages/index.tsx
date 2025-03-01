import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import Head from "next/head";

const Home = () => {
  const { deleteTokenAndUser } = useAuth()
  return (
    <>
      <Head>
        <title>Work Tracking v1.0 by CNTT LHU</title>
        <meta name="description" content="a application support for tracking work time of student in faculty of information technology LHU" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/logo256px.jpg" />
      </Head>
      <div className="d-flex">hello</div>
      <button onClick={deleteTokenAndUser}>dx</button>
    </>
  );
}

export default withAuth(Home)