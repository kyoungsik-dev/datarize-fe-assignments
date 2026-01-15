// 숫자에 천 단위 콤마를 추가하는 함수
export function comma(num: number | string): string {
  if (typeof num === 'number') return num.toLocaleString('ko-KR')
  if (!num) return ''
  const n = Number(num)
  if (isNaN(n)) return String(num)
  return n.toLocaleString('ko-KR')
}
