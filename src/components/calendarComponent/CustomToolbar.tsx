// components/CustomToolbar.tsx
import { ToolbarProps, View } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { EventType } from '@/ts/type';

export default function CustomToolbar(props: ToolbarProps<EventType>) {
  const { label, date, onNavigate, view, onView } = props;
  const views: View[] = ['week', 'month', 'day'];
  dayjs.locale('vi');

  let customLabel = label;

  if (view === 'week') {
    const start = dayjs(date).startOf('week');
    const end = dayjs(date).endOf('week');
    customLabel = `${start.format('DD')} tháng ${start.format('M')} – ${end.format('DD')} tháng ${end.format('M')}`;
  }

  if (view === 'day') {
    const d = dayjs(date);
    customLabel = `${d.format('dddd')} ${d.format('DD')} tháng ${d.format('MM')}`;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
      <div>
        <button className='btn btn-info' style={{ color: 'white' }} onClick={() => onNavigate('PREV')}>←</button>
        <button className='btn btn-info' onClick={() => onNavigate('TODAY')} style={{ margin: '0 8px', color: 'white' }}>
          Hôm nay
        </button>
        <button className='btn btn-info' style={{ color: 'white' }} onClick={() => onNavigate('NEXT')}>→</button>
      </div>
      <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{customLabel}</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        {views.map((v) => (
          <button
            className='btn btn-info'
            key={v}
            onClick={() => { onView(v); onNavigate('DATE'); }}
            style={{
              fontWeight: view === v ? 'bold' : 'normal',
              border: view === v ? '1px solid black' : 'none',
              color: 'white'
            }}
          >
            {v === 'day' ? 'Ngày' : v === 'week' ? 'Tuần' : 'Tháng'}
          </button>
        ))}
      </div>
    </div>
  );
}
