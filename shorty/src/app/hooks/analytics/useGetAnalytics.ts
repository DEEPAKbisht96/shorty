import { UrlAnalyticsResponse } from '@/types/analytic';
import { useApiQuery } from '../network/useApiQuery';

export function useGetAnalyticsQuery({
    id,
    key = ["url analytics"],
    enabled = false,
}: {
    id: string
    key?: readonly unknown[];
    enabled?: boolean;
}) {
    return useApiQuery<UrlAnalyticsResponse>({
        key: ["url analytics", id],
        url: `/analytic/${id}`,
        enabled,
    });
}
