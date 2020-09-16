import { useState } from 'react';

export default function TableCell({ }) {
    const [truthValue, setTruthValue] = useState(true);
    return (
        <td
            onClick={() => setTruthValue(!truthValue)}
            className='text-white font-semibold border px-4 py-2 hover:bg-gray-700'
        >
            {truthValue ? 'T' : 'F'}
        </td>
    );
}