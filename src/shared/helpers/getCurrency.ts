const CURRENCIES = ['Pesos Argentinos', 'Dólar Oficial', 'Dólar Paralelo']

export const getCurrency = (currencyId: number) => {
    return CURRENCIES[currencyId - 1]
}

export const getCurrencyId = (currency: string) => {
    return CURRENCIES.indexOf(currency) + 1
}