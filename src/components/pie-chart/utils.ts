import { PieChartData } from './PieChart';

export interface Point {
    x: number;
    y: number;
}

export interface PieCoordinates {
    percentage: number;
    previousPercentage: number;
    p1: Point;
    p2: Point;
}

export function getCircleCoordinates(data: PieChartData[]): PieCoordinates[] {
    const sum = data.reduce((acc, datum) => acc + datum.value, 0);
    let percentageUsed = 0;

    const percentages = data.map((datum) => datum.value / sum);
    let previousPie: PieCoordinates = { percentage: 0, previousPercentage: 0, p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
    const coordinates: PieCoordinates[] = new Array(data.length);
    let i = 0;

    for (const percentage of percentages) {
        percentageUsed += percentage;
        const newCoordinate = {
            percentage,
            previousPercentage: percentageUsed - percentage,
            p1: { x: previousPie.p2.x , y: previousPie.p2.y },
            p2: { x: Math.cos(2 * Math.PI * percentageUsed), y: Math.sin(2 * Math.PI * percentageUsed) }
        };
        coordinates[i] = newCoordinate;
        i++;
        previousPie =  { ...newCoordinate };
    }

    return coordinates.map(({ percentage, previousPercentage, p1, p2 }) => ({
        percentage,
        previousPercentage,
        p1: normalPointToSVG(p1),
        p2: normalPointToSVG(p2),
    }));
}

export function normalPointToSVG(point: Point): Point {
    return ({
        x: point.x + 1,
        y: point.y + 1
    });
}
