import { ToWords } from 'to-words';

export const toWords = new ToWords({
  localeCode: 'en-US',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: 'Naira',
      plural: 'Naira',
      symbol: 'N',
      fractionalUnit: {
        name: 'Paisa',
        plural: 'Paise',
        symbol: '',
      },
    },
  },
});
