import React from "react";
import { Table as BootstrapTable } from "react-bootstrap";

interface TableProps {
    data: number[][];
}

const StyledTable: React.FC<TableProps> = ({ data }) => {
    const tableStyle: React.CSSProperties = {
        width: "50%", // Set width to 50% of screen width
        margin: "auto", // Center the table
    };

    return (
        <BootstrapTable
            bordered
            hover
            size="sm"
            style={tableStyle}
            className="text-center"
        >
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="align-middle">
                                {typeof cell === "number"
                                    ? cell.toFixed(2)
                                    : cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </BootstrapTable>
    );
};

export default StyledTable;
