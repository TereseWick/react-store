
export function formatCurrency(v) {
    const n = Number(v);
    if (Number.isNaN(n)) return String(v ?? '');
    try { return new Intl.NumberFormat('nb-NO' ,{style: 'currency' ,currency:'NOK'}).format(n); }
    catch {return `${n} NOK`;}
}
export default formatCurrency;