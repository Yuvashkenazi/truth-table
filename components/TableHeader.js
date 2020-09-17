import { InlineMath } from 'react-katex';

export default function TableHeader({ col, currentlyEditing, setCurrentlyEditing, expression }) {
    const active = currentlyEditing === col;
    return (
        <th
            className={`relative z-50 px-4 py-2 border text-white hover:bg-blue-700 ${active ? 'bg-blue-500' : ''}`}
            onClick={() => setCurrentlyEditing(col)}
        >
            <span>
                {!!expression ? <InlineMath math={expression.expression} /> : <>&nbsp;</>}
            </span>
        </th>
    );
}