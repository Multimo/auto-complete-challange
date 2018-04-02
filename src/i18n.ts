import * as i18n from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';
import * as Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: { escapeValue: false },
    react: { wait: true},
    lng: 'en',
    resources: {
      en: {
        translation: {
          title: 'Find a bus for your next trip',
          blurb: 'Now serving bus schedules for 10436 cities in 89 countries',
          search: 'Search',
          departure: {
            leaving_from: 'Leaving from'
          },
          destination: {
            going_to: 'Going to'
          }
        }   
      },
      fr: {
        translation: {
          title: 'Trouvez l\'autobus pour votre prochaine aventure',
          blurb: 'Relie maintenant 10436 villes dans 89 pays',
          search: 'Rechercher',
          departure: {
            leaving_from: 'Départ de'
          },
          destination: {
            going_to: 'Arriver à'
          }
        }
      },
    },

  });

export default i18n;