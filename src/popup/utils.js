import numeral from 'numeral';


export function formatBytes(bytes) {
    return bytes < 1000000
        ? numeral(bytes).format('0 b')
        : numeral(bytes).format('0.0 b');
}
