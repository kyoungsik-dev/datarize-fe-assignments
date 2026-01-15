import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatDateToISO, parseISOToDate } from '@/utils/date'
import { DEFAULT_DATE_RANGE } from '@/utils/date'
import styles from './DateRangePicker.module.css'
interface DateRangePickerProps {
  from: string
  to: string
  onChange: (range: { from: string; to: string }) => void
}

const DateRangePicker = ({ from, to, onChange }: DateRangePickerProps) => {
  const fromDate = parseISOToDate(from)
  const toDate = parseISOToDate(to)

  return (
    <div className={styles.dateRangePicker}>
      <div>
        <DatePicker
          selected={fromDate}
          onChange={(date: Date | null) => onChange({ from: formatDateToISO(date), to })}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          dateFormat="yyyy-MM-dd"
          minDate={parseISOToDate(DEFAULT_DATE_RANGE.from)!}
          maxDate={toDate || undefined}
          placeholderText="시작일"
        />
      </div>
      <span>~</span>
      <div>
        <DatePicker
          selected={toDate}
          onChange={(date: Date | null) => onChange({ from, to: formatDateToISO(date) })}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
          dateFormat="yyyy-MM-dd"
          minDate={fromDate || undefined}
          maxDate={parseISOToDate(DEFAULT_DATE_RANGE.to)!}
          placeholderText="종료일"
        />
      </div>
    </div>
  )
}

export default DateRangePicker
