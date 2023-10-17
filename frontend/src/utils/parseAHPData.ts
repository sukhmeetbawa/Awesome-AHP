export function parseAHPData(data: AHPData): {
    criteriaMatrix: number[][];
    alternativeMatrices: number[][][];
} {
    const criteriaMatrix: number[][] = [];
    const alternativeMatrices: number[][][] = [];

    // Parse criteria comparison
    for (const key in data.criteria_comparison) {
        criteriaMatrix.push(data.criteria_comparison[key]);
    }

    // Parse alternative comparison for each criterion
    for (const criterion in data.alternative_comparison) {
        const alternativeMatrix: number[][] = [];
        for (const alternative in data.alternative_comparison[criterion]) {
            alternativeMatrix.push(
                data.alternative_comparison[criterion][alternative],
            );
        }
        alternativeMatrices.push(alternativeMatrix);
    }

    return { criteriaMatrix, alternativeMatrices };
}