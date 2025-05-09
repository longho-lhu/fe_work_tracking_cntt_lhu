import { ReactNode } from "react"

type TCardInfor = {
  icon: ReactNode;
  title: string;
  value: number;
}
export default function CardInfor({ icon, title, value }: TCardInfor) {
  return <div className="col d-flex" style={{ background: "#fff", padding: 20, borderRadius: 5 }}>
    <div className="col">
      {icon}
    </div>
    <div className="col" style={{ padding: '0px 15px', width: '100%', minWidth: 150 }}>
      <div className="text-center" style={{ fontWeight: 600 }}>
        {value}
      </div>
      <div style={{ color: '#8c9ea9', whiteSpace: 'nowrap' }}>
        {title}
      </div>
    </div>
  </div>
}