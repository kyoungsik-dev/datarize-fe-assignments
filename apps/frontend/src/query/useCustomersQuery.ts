import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '@/api'
import { CustomersParams, CustomersResponse } from '@/types'

export function useCustomersQuery(params: CustomersParams) {
  return useQuery<CustomersResponse, Error>({
    queryKey: ['customers', params],
    queryFn: () => getCustomers(params),
  })
}
