import dayjs from 'dayjs'

// 기본 날짜 범위 (2025년 10월 ~ 12월)
export const DEFAULT_DATE_RANGE = {
  from: '2025-10-01',
  to: '2025-12-31',
}

// Date 객체 -> YYYY-MM-DD
export function formatDateToISO(date: Date | null): string {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}

// YYYY-MM-DD -> Date 객체
export function parseISOToDate(dateString: string): Date | null {
  if (!dateString) return null
  const parsed = dayjs(dateString)
  return parsed.isValid() ? parsed.toDate() : null
}

// 날짜 표시 형식 (YYYY년 MM월 DD일)
export function formatDateDisplay(dateString: string): string {
  return dayjs(dateString).format('YYYY년 MM월 DD일')
}
