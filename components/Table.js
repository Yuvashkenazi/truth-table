import TableHeader from '../components/TableHeader';
import TableRow from '../components/TableRow';

export default function Table({ rows, cols, currentlyEditing, setCurrentlyEditing, expressions, getTruthValues }) {

    const tableHeaders = [...Array(cols).keys()].map(indx => (
        <TableHeader
            key={indx}
            col={indx}
            expression={expressions.find(expression => expression.col === indx)}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
        />
    ));

    const rowEls = [...Array(rows).keys()].map(indx => (
        <TableRow key={indx} rowId={indx} cols={cols} getTruthValues={getTruthValues} />
    ));
    return (
        <table className='table-auto mt-6'>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody className="text-center">
                {rowEls}
            </tbody>
        </table>
    );
}