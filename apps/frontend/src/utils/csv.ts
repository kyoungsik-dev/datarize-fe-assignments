import type { Purchase } from '@/types'

// Purchase 배열을 CSV 문자열로 변환
export function convertToCSV(purchases: Purchase[]): string {
  if (purchases.length === 0) {
    return ''
  }

  const headers = ['날짜', '고객명', '상품명', '가격', '수량']
  const rows = purchases.map((p) => [p.date, p.customerName, p.productName, p.price.toString(), p.quantity.toString()])

  const csvContent = [headers.join(','), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(','))].join('\n')

  return csvContent
}

// CSV 파일 다운로드
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
