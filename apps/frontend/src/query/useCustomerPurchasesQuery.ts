import { useQuery } from '@tanstack/react-query'
import { getCustomerPurchases } from '@/api'
import type { CustomerPurchase, DateRangeParams } from '@/types'

export function useCustomerPurchasesQuery(customerId?: number | null, dateRange: DateRangeParams = {}) {
  return useQuery<CustomerPurchase[], Error>({
    queryKey: ['customerPurchases', customerId, dateRange],
    queryFn: () => getCustomerPurchases(customerId as number, dateRange),
  })
}
