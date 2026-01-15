// 가격대별 구매 빈도
export interface PurchaseFrequency {
  range: string
  count: number
}

// CSV 추출용 구매 데이터
export interface Purchase {
  date: string
  customerName: string
  productName: string
  price: number
  quantity: number
}

// 고객 정보
export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

// 고객 목록 응답
export interface CustomersResponse {
  data: Customer[]
  pagination: Pagination
}

// 페이지네이션 정보
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// 고객 상세 구매 내역
export interface CustomerPurchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

// 날짜 범위 조회 파라미터 타입
export interface DateRangeParams {
  from?: string
  to?: string
}

// 고객 목록 조회 파라미터 타입
export interface CustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
  page?: number
  limit?: number
  from?: string
  to?: string
}
