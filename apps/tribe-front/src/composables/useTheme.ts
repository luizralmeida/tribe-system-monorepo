import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDark = ref(false);

  const updateThemeAttributes = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = dark ? 'dark' : 'light';
  };

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    updateThemeAttributes(isDark.value);
  };

  onMounted(() => {
    const savedTheme = localStorage.theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    isDark.value = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    updateThemeAttributes(isDark.value);
  });

  return {
    isDark,
    toggleTheme
  };
}
