import { useState, useEffect } from 'react';

export default function TableCell({ row, col, getTruthValues }) {
    const [truthValue, setTruthValue] = useState(true);

    useEffect(() => {
        getTruthValues({ row, col, truthValue });
    }, [])

    useEffect(() => {
        getTruthValues({ row, col, truthValue });
    }, [truthValue])

    let color = truthValue ? 'bg-green-700' : 'bg-red-700';
    let hoverColor = truthValue ? 'bg-green-800' : 'bg-red-800';

    return (
        <td
            onClick={() => setTruthValue(!truthValue)}
            className={`text-white font-semibold border px-4 py-2 ${color} hover:${hoverColor}`}
        >
            {truthValue ? 'T' : 'F'}
        </td>
    );
}