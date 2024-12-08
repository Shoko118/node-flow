import { ref, onMounted, onUnmounted } from "vue";

export function useMediaQuery(query: string) {
  const matches = ref(false);

  if (typeof window === "undefined") return matches;

  const mediaQuery = window.matchMedia(query);

  const updateMatches = (e: MediaQueryListEvent | MediaQueryList) => {
    matches.value = e.matches;
  };

  onMounted(() => {
    updateMatches(mediaQuery);
    mediaQuery.addEventListener("change", updateMatches);
  });

  onUnmounted(() => {
    mediaQuery.removeEventListener("change", updateMatches);
  });

  return matches;
}
