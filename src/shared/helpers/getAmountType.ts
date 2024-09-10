export const getAmountType = (amountTypeId: number) => {
    const roles = ['Mensual', 'Horario']

    return roles[amountTypeId - 1]
}