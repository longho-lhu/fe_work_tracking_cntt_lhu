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
  return <div className={className} style={style}>
    <div className="welcome"> Welcome {data.displayName}</div>
    <div className="item"> <IoPersonCircleSharp size={25} className="me-1" />Profile</div>
    <div className="item"><IoIosSettings size={25} className="me-1" />Setting</div>
    <div className="item"><IoMdLogOut size={25} className="me-1" />Logout</div>
  </div>
}