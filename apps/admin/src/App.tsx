import { useTranslation } from "react-i18next";

export function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-8 gap-6">
      <label className="flex items-center gap-2 text-sm text-slate-400">
        <span>{t("language.label")}</span>
        <select
          className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-slate-100"
          value={i18n.resolvedLanguage ?? "en"}
          onChange={(e) => void i18n.changeLanguage(e.target.value)}
          aria-label={t("language.label")}
        >
          <option value="ar">{t("language.ar")}</option>
          <option value="en">{t("language.en")}</option>
          <option value="es">{t("language.es")}</option>
        </select>
      </label>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t("app.title")}</h1>
        <p className="text-slate-400 text-sm">{t("app.subtitle")}</p>
      </div>
      <div>
        {t("pages.homePage.findYourPerfectVenue")}
        {t("pages.homePage.messages")}
      </div>
    </div>
  );
}
