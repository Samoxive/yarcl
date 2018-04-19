const DEFAULT_COLORS = [
    '#3498DB',
    '#1ABC9C',
    '#E74C3C',
    '#9B59B6',
    '#F39C12',
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#46BFBD',
];

export const getColorGenerator = () => {
    let i = 0;
    return () => {
        const color = DEFAULT_COLORS[i];
        i = (i + 1) % DEFAULT_COLORS.length;
        return color;
    };
};