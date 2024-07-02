export const getRole = (roleId: number) => {
    const roles = ['Administrador', 'Consultor', 'Empleado']

    return roles[roleId - 1]
}