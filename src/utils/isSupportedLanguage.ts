import { BUNDLED_LANGUAGES } from "shiki"

export const isSupportedLanguage = (languageName: string): boolean => {
  if (languageName === "") return false

  return BUNDLED_LANGUAGES.some(
    (lang) =>
      lang.id === languageName ||
      lang.aliases?.some((alias) => alias === languageName)
  )
}
