// Helper function for fetch requests
export async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} fetching ${url}`);
  }
  return await response.json() as T;
}