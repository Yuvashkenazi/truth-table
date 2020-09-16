import TableHeader from '../components/TableHeader';
import TableCell from '../components/TableCell';

export default function Table({ rows, cols, currentlyEditing, setCurrentlyEditing, expressions }) {

    const tableHeaders = [...Array(cols).keys()].map(indx => (
        <TableHeader
            key={indx}
            col={indx}
            expression={expressions.find(expression => expression.col === indx)}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
        />
    ));

    const colEls = [...Array(cols).keys()].map(indx => (
        <TableCell key={indx} />
    ));

    const rowEls = [...Array(rows).keys()].map(indx => (
        <tr
            key={indx}
            className=''
        >
            {colEls}
        </tr>
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