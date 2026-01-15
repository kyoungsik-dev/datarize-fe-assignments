import { useQuery } from '@tanstack/react-query'
import { getPurchaseFrequency } from '@/api'
import { DateRangeParams, PurchaseFrequency } from '@/types'

export function usePurchaseFrequencyQuery(dateRange: DateRangeParams) {
  return useQuery<PurchaseFrequency[], Error>({
    queryKey: ['purchase-frequency', dateRange.from, dateRange.to],
    queryFn: () => getPurchaseFrequency(dateRange),
  })
}
