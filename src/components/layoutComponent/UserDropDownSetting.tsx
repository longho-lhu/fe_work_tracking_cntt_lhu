import { useAuth } from "@/context/AuthContext";
import { CSSProperties } from "react"
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { IoPersonCircleSharp } from "react-icons/io5";

type TDropData = {
  displayName: string;
}

type Props = {
  className?: string;
  style?: CSSProperties;
  data: TDropData;
}

export default function UserSettingDropDown({ className, style, data }: Props) {
  const { deleteTokenAndUser } = useAuth();
  return <div className={className} style={style}>
    <div className="welcome"> Xin chào {data.displayName}</div>
    <div className="item"> <IoPersonCircleSharp size={25} className="me-1" />Trang cá nhân</div>
    <div className="item"><IoIosSettings size={25} className="me-1" />Cài đặt</div>
    <div className="item" onClick={deleteTokenAndUser}><IoMdLogOut size={25} className="me-1" />Đăng xuất</div>
  </div>
}