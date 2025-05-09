import { Tabs, type TabsProps } from 'antd';

export default function AdminDashboardTabList() {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Danh sách làm việc',
            children: <TabListWorker />,
        },
        {
            key: '2',
            label: 'Thống kê giờ thực tập',
            children: <TabListCountTime />,
        },
    ];
    const onChange = (key: string) => {
        console.log(key);
    };
    return <>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
    </>
}

function TabListWorker() {
    return <>Danh sách sv làm việc</>
}

function TabListCountTime() {
    return <>Thống kê giờ </>
}
