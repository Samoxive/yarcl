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

export function getPointOnCircle(topLeftPoint: Point,
                                 radius: number,
                                 percentage: number,
                                 startingPercentage: number): Point {
    const middlePoint: Point = { x: topLeftPoint.x + radius, y: topLeftPoint.y + radius };
    const rawX = middlePoint.x + (radius * Math.cos(2 * Math.PI * ((percentage + startingPercentage))));
    const rawY = middlePoint.y + (radius * Math.sin(2 * Math.PI * ((percentage + startingPercentage))));
    return {
        x: rawX,
        y: rawY
    };
}

export function getCircleCoordinates(data: PieChartData[]): PieCoordinates[] {
    const sum = data.reduce((acc, datum) => acc + datum.value, 0);
    let percentageUsed = 0;

    const percentages = data.map((datum) => datum.value / sum);
    const coordinates: PieCoordinates[] = new Array(data.length);
    let i = 0;

    for (const percentage of percentages) {
        const newCoordinate = {
            percentage,
            previousPercentage: percentageUsed,
            p1: getPointOnCircle({x: 0, y: 0}, 1, percentageUsed, 0),
            p2: getPointOnCircle({x: 0, y: 0}, 1, percentageUsed + percentage, 0)
        };
        coordinates[i] = newCoordinate;
        i++;
        percentageUsed += percentage;
    }

    return coordinates;
}

export function normalPointToSVG(point: Point): Point {
    return ({
        x: point.x + 1,
        y: point.y + 1
    });
}
