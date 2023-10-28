export function parseAHPData(data: string): {
    criteriaMatrix: number[][];
    alternativeMatrices: number[][][];
} {
    const parsedData: {
        criteria_comparison: Record<string, number[]>;
        alternative_comparison: Record<string, Record<string, number[]>>;
    } = JSON.parse(data);

    const criteriaMatrix: number[][] = [];
    const alternativeMatrices: number[][][] = [];

    // Parse criteria comparison
    for (const key in parsedData.criteria_comparison) {
        criteriaMatrix.push(parsedData.criteria_comparison[key]);
    }

    // Parse alternative comparison for each criterion
    for (const criterion in parsedData.alternative_comparison) {
        const alternativeMatrix: number[][] = [];
        for (const alternative in parsedData.alternative_comparison[
            criterion
        ]) {
            alternativeMatrix.push(
                parsedData.alternative_comparison[criterion][alternative],
            );
        }
        alternativeMatrices.push(alternativeMatrix);
    }

    return { criteriaMatrix, alternativeMatrices };
}
