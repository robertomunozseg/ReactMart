const formatNumber = (value: number) =>
    new Intl.NumberFormat('es-MX').format(value);

export { formatNumber };