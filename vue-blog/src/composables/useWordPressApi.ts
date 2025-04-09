import { ref } from 'vue';

// Define an interface for the Page structure (adjust based on actual API response)
export interface WPPageData {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media?: number; // Optional featured media ID
  excerpt?: { rendered: string }; // Optional excerpt
  // Structure for embedded data (adjust based on actual API response with _embed)
  _embedded?: {
    'wp:featuredmedia'?: WPMediaData[]; // Array containing featured media details
    // Add other embedded fields if needed
  };
  // Add other relevant fields from your WP API response
}

// Define an interface for Media details (adjust as needed)
export interface WPMediaData {
  id: number;
  source_url: string; // URL of the image
  alt_text: string; // Alt text
  description?: { rendered: string }; // Optional description (used in original code)
  // Add other relevant fields
}


// Base URL for the WP API - We'll make this configurable later
const WP_API_BASE_URL = '/wp-api'; // TODO: Move to config

// Helper function for fetch requests
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} fetching ${url}`);
  }
  return await response.json() as T;
}


export function useWordPressApi() {
  // State for list of pages
  const pages = ref<WPPageData[] | null>(null);
  const loadingPages = ref(false);
  const errorPages = ref<Error | null>(null);

  // State for a single page
  const page = ref<WPPageData | null>(null);
  const loadingPage = ref(false);
  const errorPage = ref<Error | null>(null);

  // State for media item
  const media = ref<WPMediaData | null>(null);
  const loadingMedia = ref(false);
  const errorMedia = ref<Error | null>(null);


  const fetchPages = async () => {
    loadingPages.value = true;
    errorPages.value = null; // Corrected: Was 'error.value = null;'
    try {
      // Add _embed=true to fetch embedded data like featured media
      const data = await fetchData<WPPageData[]>(`${WP_API_BASE_URL}/pages?_embed=true`);
      pages.value = data;
    } catch (err) {
      console.error("Failed to fetch pages:", err);
      errorPages.value = err instanceof Error ? err : new Error('An unknown error occurred fetching pages');
    } finally {
      loadingPages.value = false;
    }
  };

  const fetchPageBySlug = async (slug: string) => {
    loadingPage.value = true;
    errorPage.value = null;
    page.value = null; // Reset page on new fetch
    try {
      // WP API usually returns an array even when filtering by slug, take the first element
      const data = await fetchData<WPPageData[]>(`${WP_API_BASE_URL}/pages?slug=${slug}`);
      if (data && data.length > 0) {
        page.value = data[0];
        // If page found and has featured media, fetch it immediately
        if (page.value.featured_media) {
          await fetchMediaById(page.value.featured_media); // Call fetchMediaById internally
        } else {
          media.value = null; // Ensure media is null if no featured_media ID
        }
      } else {
        page.value = null; // Not found
        media.value = null; // Ensure media is null if page not found
        // Optionally throw a specific 'Not Found' error
        // throw new Error(`Page with slug '${slug}' not found.`);
      }
    } catch (err) {
      console.error(`Failed to fetch page with slug ${slug}:`, err);
      errorPage.value = err instanceof Error ? err : new Error(`An unknown error occurred fetching page ${slug}`);
    } finally {
      loadingPage.value = false;
    }
  };

  const fetchMediaById = async (id: number) => {
    if (!id) {
      media.value = null;
      return; // Don't fetch if ID is invalid/zero
    }
    loadingMedia.value = true;
    errorMedia.value = null;
    media.value = null; // Reset media on new fetch
    try {
      // Adjust endpoint if necessary, e.g., /wp-json/wp/v2/media/
      const data = await fetchData<WPMediaData>(`${WP_API_BASE_URL}/media/${id}`);
      media.value = data;
    } catch (err) {
      console.error(`Failed to fetch media with ID ${id}:`, err);
      errorMedia.value = err instanceof Error ? err : new Error(`An unknown error occurred fetching media ${id}`);
    } finally {
      loadingMedia.value = false;
    }
  };

  // We can add fetchPageBySlug/ID here later

  return {
    pages,
    loadingPages,
    errorPages,
    fetchPages,

    page,
    loadingPage,
    errorPage,
    fetchPageBySlug,

    media,
    loadingMedia,
    errorMedia,
    fetchMediaById,
  };
}
