import { ref } from 'vue';
import DOMPurify from 'dompurify';
import { fetchData } from '../utils/utils';
import type { WPMediaData} from '../types/wordpressTypes'
// Base URL for the WP API - We'll make this configurable later
const WP_API_BASE_URL = '/wp-api'; // TODO: Move to config

export function useGetWordpressSidebarApi() {
  // State for a single sidebar
  const sidebar = ref<any | null>(null);
  const loadingSidebar = ref(false);
  const errorSidebar = ref<Error | null>(null);

  // State for media item
  const media = ref<WPMediaData | null>(null);
  const loadingMedia = ref(false);
  const errorMedia = ref<Error | null>(null);

  const fetchSidebarByID = async (id: string) => {
    loadingSidebar.value = true;
    errorSidebar.value = null;
    sidebar.value = null; // Reset sidebar on new fetch
    try {
      // WP API usually returns an array even when filtering by slug, take the first element
      const data = await fetchData<WPSidebarData[]>(`/sidebars?sidebar=${id}`);
      console.log('sidebardata',data)
      if (data) {
        sidebar.value = DOMPurify.sanitize(data['sidebar']);
      } else {
        sidebar.value = null; // Not found
        throw new Error(`Sidebar with slug '${slug}' not found.`);
      }
    } catch (err) {
      console.error(`Failed to fetch sidebar with id ${id}:`, err);
      errorSidebar.value = err instanceof Error ? err : new Error(`An unknown error occurred fetching sidebar ${id}`);
    } finally {
        console.log('finallysdiebar',sidebar.value)
      loadingSidebar.value = false;
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
  return {
    sidebar,
    loadingSidebar,
    errorSidebar,
    fetchSidebarByID,

    media,
    loadingMedia,
    errorMedia,
    fetchMediaById,
  };
}