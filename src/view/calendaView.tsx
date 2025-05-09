"use client";
import { Calendar, momentLocalizer, SlotInfo, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import 'moment/locale/vi';
import { EventType } from '@/ts/type';
import { Form, Input, Modal, Select, TimePicker } from 'antd';
// import dayjs from 'dayjs';
import CustomToolbar from '@/components/calendarComponent/CustomToolbar';
import dayjs from 'dayjs';
import axiosCustom from '@/services/axiosCustom';
import { useNotification } from '@/context/Notification';

moment.locale('vi');
const localizer = momentLocalizer(moment);

const jobTypes = ['OFF-Làm việc offline', 'ON-Làm việc online', 'CT-Đi công tác'];
export default function CalendarView() {
    const { showNoti } = useNotification();
    const [events, setEvents] = useState<EventType[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    // const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentView, setCurrentView] = useState<View>('week');
    const [form] = Form.useForm();

    useEffect(() => {
        (async () => {
            const listCalen = await axiosCustom.get('work/get-calen');
            console.log(listCalen.data)
            setEvents(listCalen.data.filter((item: any) => item.status == 1).map((calen: any) => {
                return {
                    id: calen.id,
                    title: calen.description,
                    start: moment(`${calen.date} ${calen.start_time}`, 'DD-MM-YYYY HH:mm').toDate(),
                    end: moment(`${calen.date} ${calen.end_time}`, 'DD-MM-YYYY HH:mm').toDate(),
                    type: calen.work_type,
                }
            }))
        })();
    }, [])

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        const now = moment();
        const selectedStart = moment(slotInfo.start);

        if (selectedStart.isBefore(now, 'minute')) {
            showNoti({ title: 'Lỗi', message: 'Không thể chọn thời gian trong quá khứ', type: 'info' })
            console.warn('Không thể chọn thời gian trong quá khứ');
            return;
        }

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
        form.validateFields().then(async (values) => {
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
                id: values.id,
                title: `${values.title} (${values.type})`,
                start,
                end,
                type: values.type,
            };

            if (selectedEvent) {
                // Sửa
                try {
                    const res = await axiosCustom.put('work/update-calen', {
                        id: selectedEvent.id,
                        date: dayjs(newEvent.start).format("DD-MM-YYYY"),
                        start_time: dayjs(newEvent.start).format("HH:MM"),
                        end_time: dayjs(newEvent.end).format("HH:MM"),
                        description: newEvent.title,
                        work_type: newEvent.type.split("-")[0]
                    })
                    if (res.status === 201) {
                        // setEvents([...events, newEvent]);
                        setEvents((prev) =>
                            prev.map((ev) => (ev.id === selectedEvent.id ? newEvent : ev))
                        );
                        showNoti({ title: 'Thành công', message: 'Đã thêm lịch thành công', type: 'success' })
                    }
                } catch (error: any) {
                    showNoti({ title: 'Lỗi!', message: error.response.data.message, type: 'error' })
                }
            } else {
                // Thêm mới
                try {
                    console.log('new', newEvent)
                    const res = await axiosCustom.post('work/reg-calen', {
                        date: dayjs(newEvent.start).format("DD-MM-YYYY"),
                        start_time: dayjs(newEvent.start).format("HH:MM"),
                        end_time: dayjs(newEvent.end).format("HH:MM"),
                        description: newEvent.title,
                        work_type: newEvent.type.split("-")[0]
                    })
                    if (res.status === 201) {
                        setEvents([...events, newEvent]);
                        showNoti({ title: 'Thành công', message: 'Đã thêm lịch thành công', type: 'success' })
                    }
                } catch (error) {
                    console.log(error)
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
                    date={currentDate}
                    onNavigate={(newDate) => setCurrentDate(newDate)}
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