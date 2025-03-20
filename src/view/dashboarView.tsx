import CardInfor from "@/components/bodyComponent/CardInfor";
import DoughnutChart from "@/components/bodyComponent/DoughnutChart";
import ProgressBar from "@/components/bodyComponent/ProcessBar";
import { FaPeopleRoof } from "react-icons/fa6";

export default function DashboarView() {
  return <div className="wt-view-dashboard-container">
    <div style={{ fontSize: 18, fontWeight: 500, color: "var(--text-color-primary)" }}>Bảng điều khiển</div>
    <div className="">
      <div className="row">
        <div className="col-9">
          <div className="item-info d-flex gap-3 justify-content-center">
            <CardInfor icon={<FaPeopleRoof size={30} />} title="Tổng số Sinh viên" value={30} />
            <CardInfor icon={<FaPeopleRoof size={30} />} title="Nhóm Front-end" value={10} />
            <CardInfor icon={<FaPeopleRoof size={30} />} title="Nhóm back-end" value={10} />
            <CardInfor icon={<FaPeopleRoof size={30} />} title="Nhóm Design" value={10} />
          </div>
          <div>
            chart
          </div>
        </div>
        <div className="col-3">
          <div style={{ backgroundColor: '#fff' }}>
            <DoughnutChart />
          </div>
          <div style={{ backgroundColor: '#fff' }}>
            <ProgressBar value1={10} value2={80} />
          </div>
        </div>
      </div>
    </div>
  </div >
}