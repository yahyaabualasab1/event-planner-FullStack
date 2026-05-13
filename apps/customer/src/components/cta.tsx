import { useTranslation } from "react-i18next";

export const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">{t("cta.title")}</h2>
        <p className="text-gray-500">{t("cta.subtitle")}</p>
        <div className="flex items-center justify-center gap-4">
          <a href="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            {t("cta.getStarted")}
          </a>
          <a href="/login" className="border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            {t("cta.signIn")}
          </a>
        </div>
      </div>
    </section>
  );
};