import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";

interface TableProps {
    data: number[][];
    rowHeaders: string[];
    columnHeaders: string[];
}

const StyledTable: React.FC<TableProps> = ({
    data,
    rowHeaders,
    columnHeaders,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {columnHeaders &&
                            columnHeaders.map((header, index) => (
                                <TableCell key={index} align="center">
                                    {header}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {rowHeaders && (
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                >
                                    {rowHeaders[rowIndex]}
                                </TableCell>
                            )}
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} align="center">
                                    {typeof cell === "number"
                                        ? cell.toFixed(2)
                                        : cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StyledTable;
