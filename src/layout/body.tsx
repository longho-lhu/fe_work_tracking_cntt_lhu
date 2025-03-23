import Listmenu from "@/components/bodyComponent/ListMenu";
import UserCard from "@/components/bodyComponent/UserCard";
import { useBody } from "@/context/BodyContext";
import { EBodyMenu } from "@/ts/enum";
import CalendarView from "@/view/calendaView";
import DashboarView from "@/view/dashboarView";
import { CgScreen } from "react-icons/cg";
import { FaRegCalendarCheck, FaRegListAlt } from "react-icons/fa";

export default function BodyPage() {
  const { setMenuSelected, menuSelected } = useBody();
  return <div className="d-flex wt-body-container">
    <div className="wt-body-left">
      <UserCard />
      <Listmenu title="Admin menu" items={[{ name: "Bảng điều khiển", index: EBodyMenu.DASHBOARD, icon: <CgScreen /> }, { name: "Danh sách thực tập", index: EBodyMenu.LIST_INTERN, icon: <FaRegListAlt /> }, { name: "Lịch", index: EBodyMenu.CALENDAR, icon: <FaRegCalendarCheck /> }]} />
    </div>
    <div className="wt-body-right">
      {menuSelected === EBodyMenu.DASHBOARD && <DashboarView />}
      {menuSelected === EBodyMenu.LIST_INTERN && <DashboarView />}
      {menuSelected === EBodyMenu.CALENDAR && <CalendarView />}
    </div>
  </div>
}