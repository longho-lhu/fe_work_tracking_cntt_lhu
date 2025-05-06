import { DataProjectType } from "@/ts/interface";
import { Card, DatePicker, Dropdown, Form, Input, Menu, Modal, Select, Table, TableProps, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { IoIosSettings } from "react-icons/io";

export default function StudentDashboardView() {
  const [projectList, setProjectList] = useState<DataProjectType[]>([
    {
      id: 1,
      name: 'xây dựng trang web tuyển dụng cho công ty xyz',
      owner: "Long",
      assignTo: 'Long',
      status: "todo",
      start: '10/10/2025',
      end: '11/10/2025',
      trackingTime: 4
    },
    {
      id: 2,
      name: 'xây dựng trang web tuyển dụng cho công ty xyz',
      owner: "Long",
      assignTo: 'Long',
      status: "todo",
      start: '10/10/2025',
      end: '11/10/2025',
      trackingTime: 4
    }
  ]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<DataProjectType | null>(null);
  const [editForm] = Form.useForm();
  const handleMenuClick = (key: string, record: DataProjectType) => {
    if (key === 'e') {
      setEditProject(record);
      editForm.setFieldsValue({
        name: record.name,
        assignTo: record.assignTo,
        start: dayjs(record.start, 'DD/MM/YYYY'),
        end: dayjs(record.end, 'DD/MM/YYYY'),
      });
      setEditModalOpen(true);
    } else if (key === 'd') {
      Modal.confirm({
        title: 'Xác nhận xoá',
        content: 'Bạn có chắc muốn xoá dự án này?',
        onOk: () => {
          setProjectList((prev) => prev.filter((item) => item.id !== record.id));
        },
      });
    } else if (key === 'h') {
      alert('lich su chinh sua')
    }
  };

  const columns: TableProps<DataProjectType>['columns'] = [
    {
      title: <div className="text-center">Tên dự án</div>,
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="text-center" >
          {record.name}
        </div >
      )
    },
    {
      title: <div className="text-center">Người tạo</div>,
      dataIndex: 'owner',
      key: 'owner',
      render: (_, record) => (
        <div className="text-center" >
          {record.owner}
        </div >
      )
    },
    {
      title: <div className="text-center">Người thực hiện</div>,
      dataIndex: 'assignTo',
      key: 'assignTo',
      render: (_, record) => (
        <div className="text-center" >
          {record.assignTo}
        </div >
      )
    },
    {
      title: <div className="text-center">Trạng thái</div>,
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: '100%', textAlign: 'center' }}
          onChange={(value) => {
            const updated = projectList.map((item) =>
              item.id === record.id ? { ...item, status: value } : item
            );
            setProjectList(updated);
          }}
          options={[
            { value: 'todo', label: 'TO DO' },
            { value: 'doing', label: 'DOING' },
            { value: 'done', label: 'DONE' },
            { value: 'review', label: 'REVIEW' }
          ]}
        />
      ),
    },
    {
      title: <div className="text-center">Ngày bắt đầu</div>,
      dataIndex: 'start',
      key: 'start',
      render: (_, record) => (
        <div className="text-center" >
          {record.start}
        </div >
      )
    },
    {
      title: <div className="text-center">Ngày kết thúc</div>,
      dataIndex: 'end',
      key: 'end',
      render: (_, record) => (
        <div className="text-center" >
          {record.end}
        </div >
      )
    },
    {
      title: <div className="text-center">Giờ quy đổi</div>,
      dataIndex: 'trackingTime',
      key: 'trackingTime',
      render: (_, record) => (
        <div className="text-center" >
          {record.trackingTime}
        </div >
      )
    },
    {
      title: <div className="text-center">Thao tác</div>,
      key: 'action',
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => handleMenuClick(key, record)}
            items={[
              { key: 'e', label: <button className="btn btn-warning">Sửa dự án</button> },
              { key: 'h', label: <button className="btn btn-info">Lịch sử chỉnh sửa</button> },
              { key: 'd', label: <button className="btn btn-danger">Xoá dự án</button> },
            ]}
          />
        );

        return (
          <div className="text-center">
            <Dropdown overlay={menu} trigger={['click']}>
              <Tooltip title="Tùy chọn">
                <IoIosSettings size={22} style={{ cursor: 'pointer' }} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    },

  ];

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
    <div className="st-dashboard-body p-3">
      <Table<DataProjectType> columns={columns} dataSource={projectList} style={{ width: '100%' }} />
    </div>


    <Modal
      title="Sửa dự án"
      open={editModalOpen}
      onCancel={() => {
        setEditModalOpen(false);
        setEditProject(null);
        editForm.resetFields();
      }}
      onOk={() => {
        editForm.validateFields().then((values) => {
          if (!editProject) return;

          const updated = {
            ...editProject,
            name: values.name,
            assignTo: values.assignTo,
            start: values.start.format('DD/MM/YYYY'),
            end: values.end.format('DD/MM/YYYY'),
          };

          setProjectList((prev) =>
            prev.map((item) => (item.id === editProject.id ? updated : item))
          );

          setEditModalOpen(false);
          setEditProject(null);
          editForm.resetFields();
        });
      }}
    >
      <Form layout="vertical" form={editForm}>
        <Form.Item
          label="Tên dự án"
          name="name"
          rules={[{ required: true, message: 'Nhập tên dự án' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Người thực hiện"
          name="assignTo"
          rules={[{ required: true, message: 'Nhập người thực hiện' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ngày bắt đầu"
          name="start"
          rules={[{ required: true, message: 'Chọn ngày bắt đầu' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="end"
          rules={[{ required: true, message: 'Chọn ngày kết thúc' }]}
        >
          <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>

  </div>
}