export const getCurrency = (currencyId: number) => {
    const currencies = ['ARS', 'USD']

    return currencies[currencyId - 1]
}