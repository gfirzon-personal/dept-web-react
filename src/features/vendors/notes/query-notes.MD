added React Query cache/refetch options in Vendors.jsx:16 so navigating back to Vendors won’t call the backend immediately:

staleTime: 5 minutes
refetchOnMount: false
refetchOnWindowFocus: false
Behavior now:

First visit fetches data.
Revisiting Vendors within 5 minutes uses cache (no API call).
Clicking Refresh still forces a fetch.
After 5 minutes, data becomes stale and can refetch when relevant triggers happen.