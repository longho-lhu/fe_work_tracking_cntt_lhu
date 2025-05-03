import Listmenu from "@/components/bodyComponent/ListMenu";
import UserCard from "@/components/bodyComponent/UserCard";
import { useBody } from "@/context/BodyContext";
import { EBodyMenu } from "@/ts/enum";
import CalendarView from "@/view/calendaView";
import DashboarView from "@/view/dashboarView";
import StudentDashboardView from "@/view/studentDashboardView";
import { CgScreen } from "react-icons/cg";
import { FaRegCalendarCheck, FaRegListAlt } from "react-icons/fa";

function BodyRender() {
  const { setMenuSelected, menuSelected } = useBody();
  switch (menuSelected) {
    // student
    case EBodyMenu.ST_DASHBOARD:
      return <StudentDashboardView />;
    case EBodyMenu.CALENDAR:
      return <CalendarView />;

    // admin
    case EBodyMenu.DASHBOARD:
      return <DashboarView />;
    case EBodyMenu.LIST_INTERN:
      return <></>

    // no case
    default:
      return <></>
  }
}
export default function BodyPage() {
  const { setMenuSelected, menuSelected } = useBody();
  return <div className="d-flex wt-body-container">
    <div className="wt-body-left">
      <UserCard />
      <Listmenu title="Student menu" items={[
        { name: "Thông tin thực tập", index: EBodyMenu.ST_DASHBOARD, icon: <CgScreen /> },
        { name: "Đăng ký lịch làm việc", index: EBodyMenu.CALENDAR, icon: <FaRegCalendarCheck /> }
      ]} />
      <Listmenu title="Admin menu" items={[
        { name: "Bảng điều khiển", index: EBodyMenu.DASHBOARD, icon: <CgScreen /> },
        { name: "Danh sách thực tập", index: EBodyMenu.LIST_INTERN, icon: <FaRegListAlt /> },
      ]} />
    </div>
    <div className="wt-body-right">
      {BodyRender()}
    </div>
  </div>
}