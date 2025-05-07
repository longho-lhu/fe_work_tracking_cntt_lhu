"use client";
import { Calendar, momentLocalizer, SlotInfo, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import 'moment/locale/vi';
import { EventType } from '@/ts/type';
import { Form, Input, Modal, Select, TimePicker } from 'antd';
// import dayjs from 'dayjs';
import CustomToolbar from '@/components/calendarComponent/CustomToolbar';
import dayjs from 'dayjs';

moment.locale('vi');
const localizer = momentLocalizer(moment);

const jobTypes = ['OFF-Làm việc offline', 'ON-Làm việc online', 'CT-Đi công tác'];
export default function CalendarView() {
    const [events, setEvents] = useState<EventType[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentView, setCurrentView] = useState<View>('week');
    const [form] = Form.useForm();
    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setStartDate(slotInfo.start);
        // setEndDate(slotInfo.end);
        form.setFieldsValue({
            time: [dayjs(slotInfo.start), dayjs(slotInfo.end)],
        });
        setModalOpen(true);
    };

    const handleSelectEvent = (event: EventType) => {
        setSelectedEvent(event);
        setStartDate(event.start);

        form.setFieldsValue({
            title: event.title.replace(/ \(.+\)$/, ''),
            type: event.type,
            time: [dayjs(event.start), dayjs(event.end)],
        });

        setModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (!startDate) return;

            const start = moment(startDate)
                .hour(values.time[0].hour())
                .minute(values.time[0].minute())
                .toDate();
            const end = moment(startDate)
                .hour(values.time[1].hour())
                .minute(values.time[1].minute())
                .toDate();

            const newEvent: EventType = {
                title: `${values.title} (${values.type})`,
                start,
                end,
                type: values.type,
            };

            if (selectedEvent) {
                // Sửa
                setEvents((prev) =>
                    prev.map((ev) => (ev === selectedEvent ? newEvent : ev))
                );
            } else {
                // Thêm mới
                try {
                    console.log(newEvent)
                    // setEvents([...events, newEvent]);
                } catch (error) {

                }

            }

            form.resetFields();
            setModalOpen(false);
            setSelectedEvent(null);
        });
    };


    return (
        <div className='p-4'>
            <div style={{ height: '90vh' }}>
                {/* @ts-ignore */}
                <Calendar
                    selectable
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    views={['week', 'month', 'day']}
                    view={currentView}
                    onView={(view) => { setCurrentView(view) }}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    {...(currentView !== 'month' && {
                        min: new Date(1970, 1, 1, 6, 0),
                        max: new Date(1970, 1, 1, 22, 0),
                    })}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
            <Modal
                title={selectedEvent ? 'Sửa sự kiện' : 'Thêm sự kiện'}
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    setSelectedEvent(null);
                    form.resetFields();
                }}
                onOk={handleOk}
                footer={[
                    selectedEvent && (
                        <button
                            className='btn btn-danger'
                            key="delete"
                            onClick={() => {
                                console.log(selectedEvent)
                                setEvents(events.filter((ev) => (ev.title !== selectedEvent.title && ev.start !== selectedEvent.start)));
                                setModalOpen(false);
                                setSelectedEvent(null);
                                form.resetFields();
                            }}
                        >
                            Xoá
                        </button>
                    ),
                    <button className='btn btn-secondary ms-2' key="cancel" onClick={() => {
                        setModalOpen(false);
                        setSelectedEvent(null);
                        form.resetFields();
                    }}>
                        Hủy
                    </button>,
                    <button className='btn btn-success ms-2' key="ok" onClick={handleOk}>
                        {selectedEvent ? 'Lưu' : 'Thêm'}
                    </button>
                ]}
            >
                <Form layout="vertical" form={form} >
                    <Form.Item label="Ngày" initialValue={startDate?.toLocaleDateString()}>
                        <Input disabled value={startDate?.toLocaleDateString('vi-VN')} />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Giờ bắt đầu / kết thúc"
                        rules={[{ required: true, message: 'Chọn giờ bắt đầu và kết thúc' }]}>
                        <TimePicker.RangePicker format="HH:mm" minuteStep={15} />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Nhập mô tả sự kiện' }]}>
                        <Input placeholder="VD: Họp dự án X" />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Loại công việc"
                        rules={[{ required: true, message: 'Chọn loại công việc' }]}>
                        <Select placeholder="Chọn loại công việc">
                            {jobTypes.map((type) => (
                                <Select.Option key={type} value={type}>
                                    {type}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}