import { Avatar, Tooltip } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { FaPowerOff } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPersonGear } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axiosCustom from "@/services/axiosCustom";
import { TUserDetails } from "@/ts/type";

export default function UserCard() {
  const { user } = useAuth();
  const [userDetals, setUserDetails] = useState<TUserDetails | null>(null);
  useEffect(() => {
    (async () => {
      const userDetails = await axiosCustom.get('user/details');
      setUserDetails(userDetails.data)
    })();
  }, [])
  return <div className="wt-usecard-container text-center">
    <Avatar src={userDetals?.avatar} className="" size={64} icon={<UserOutlined />} />
    <div className="display-name">{userDetals?.full_name || user?.username}</div>
    <div className="status d-flex align-items-center justify-content-center"> <GoDotFill color="#5DD099" />Online</div>
    <div className="d-flex gap-3 justify-content-center">
      <div className="user-setting-icon">
        <Tooltip placement="top" title={"Trang cá nhân"} >
          <BsPersonGear color="#775FD5" size={15} />
        </Tooltip>
      </div>
      <div className="user-setting-icon">
        <Tooltip placement="top" title={"Cài đặt"} >
          <IoSettingsOutline size={13} />
        </Tooltip>
      </div>
      <div className="user-setting-icon">
        <Tooltip placement="top" title={"Đăng xuất"} >
          <FaPowerOff color="#F96E5B" size={13} />
        </Tooltip>
      </div>
    </div>
  </div>
}