import { computed } from 'vue';
import { useRouter } from 'vue-router';

export function useNavigation() {
  const router = useRouter();

  // Get routes that have a 'name' property, as these are intended for navigation
  const navLinks = computed(() => {
    return router.getRoutes()
      .filter(r => r.name && r.path !== '/') // Filter routes with a name, exclude root
      .map(r => ({
        to: r.path,
        text: r.name as string // Cast name to string
      }));
  });

  return {
    navLinks,
  };
}
