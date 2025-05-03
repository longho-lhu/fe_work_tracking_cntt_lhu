import { Card } from "antd";

export default function StudentDashboardView() {
  return <div className="">
    <div className="header p-3 d-flex justify-content-around">
      <Card className="text-center" title="Tổng số giờ thực tập" variant="borderless" style={{ width: 300 }}>
        <div className="text-center" style={{ fontSize: 30, fontWeight: 600 }}>
          70
        </div>
      </Card>
      <Card className="text-center" title="Tổng số giờ được xác nhận" variant="borderless" style={{ width: 300 }}>
        <div className="text-center" style={{ fontSize: 30, fontWeight: 600 }}>
          70
        </div>
      </Card>
      <Card className="text-center" title="Tỉ lệ hoàn thành" variant="borderless" style={{ width: 300 }}>
        <div className="text-center" style={{ fontSize: 30, fontWeight: 600 }}>
          10%
        </div>
      </Card>
    </div>
  </div>
}