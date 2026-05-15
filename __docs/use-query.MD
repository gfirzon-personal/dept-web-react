Done. Here's what changed:

package.json — @tanstack/react-query installed.

App.jsx — QueryClient created and QueryClientProvider wraps the app.

Vendors.jsx — Replaced context-based data fetching with:

useQuery({ queryKey: ['vendors'], queryFn: vendorService.fetchVendors }) — handles fetching, caching, loading state, and background refetch automatically.
useMutation for delete — on success it calls queryClient.invalidateQueries(['vendors']) to re-fetch the list automatically.
refetch() is now used for the manual refresh button.
VendorContext is still in place for EditVendor.jsx which uses it for getVendor/createVendor/updateVendor.