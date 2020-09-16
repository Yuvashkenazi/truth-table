import TableCell from '../components/TableCell';

export default function TableRow({ rowId, cols, getTruthValues }) {
    const colEls = [...Array(cols).keys()].map(indx => (
        <TableCell key={indx} row={rowId} col={indx} getTruthValues={getTruthValues} />
    ));

    return (
        <tr>
            {colEls}
        </tr>
    );
}