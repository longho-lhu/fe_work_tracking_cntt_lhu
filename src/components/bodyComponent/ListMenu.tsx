import { useBody } from "@/context/BodyContext";
import { EBodyMenu } from "@/ts/enum";
import { ReactNode } from "react";

type TDataMenu = {
  title?: string;
  items?: {
    name: string;
    index: EBodyMenu;
    icon: ReactNode;
  }[]
}
export default function Listmenu({ title, items }: TDataMenu) {
  const { setMenuSelected } = useBody();
  return <div className="wt-letft-list-menu">
    {title && <div className="title">{title}</div>}
    {items?.map((item) => {
      return <div key={item.name} className="item d-flex align-items-center gap-2">
        {item.icon}{item.name}
      </div>
    })}
  </div>
}