import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/router";
import { useNotification } from "@/context/Notification";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ProtectedComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const noti = useNotification();

    useEffect(() => {
      // const token = localStorage.getItem("wt-accessToken");
      // if (!token) {
      //   noti.showNoti({ title: 'No access permision!', message: "Don't find a account please login again...", type: 'error' })
      //   router.push("/auth/login");
      // } else {
      //   setLoading(false);
      // }
    }, []);

    if (loading) return <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>;

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAuth;
