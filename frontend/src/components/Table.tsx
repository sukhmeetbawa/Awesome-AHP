import React from "react";

interface TableProps {
    data: string[][];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <table>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
