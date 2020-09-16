import { InlineMath } from 'react-katex';

export default function Toolbar({ upateExpression, backspace, clear, done }) {
    const btnClass = 'bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mx-2 flex-grow';

    const handleExpression = rawExpression => {
        const expression = rawExpression + ' ';
        upateExpression({ expression })
    };

    const handleBackspace = () => {
        backspace();
    };

    const handleClear = () => {
        clear();
    };

    const handleDone = () => {
        done();
    };

    return (
        <div className='flex flex-col border rounded py-1'>
            <div className='flex justify-around align-middle py-2'>
                <button className={btnClass} onClick={() => handleExpression('P')}>
                    <InlineMath math='P' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('Q')}>
                    <InlineMath math='Q' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('R')}>
                    <InlineMath math='R' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('S')}>
                    <InlineMath math='S' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('T')}>
                    <InlineMath math='T' />
                </button>
            </div>

            <div className='flex justify-around align-middle py-2'>
                <button className={btnClass} onClick={() => handleExpression('\\sim')}>
                    <InlineMath math='\sim' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('\\wedge')}>
                    <InlineMath math='\wedge' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('\\vee')}>
                    <InlineMath math='\vee' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('\\oplus')}>
                    <InlineMath math='\oplus' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('\\implies')}>
                    <InlineMath math='\implies' />
                </button>
                <button className={btnClass} onClick={() => handleExpression('\\iff')}>
                    <InlineMath math='\iff' />
                </button>
            </div>

            <div className='flex justify-around align-middle py-2'>
                <button className={btnClass} onClick={() => handleExpression('(')}>
                    <InlineMath math='(' />
                </button>
                <button className={btnClass} onClick={() => handleExpression(')')}>
                    <InlineMath math=')' />
                </button>
                <button className={'bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mx-2 flex-grow'}
                    onClick={handleBackspace}>
                    Backspace
                </button>
                <button className={'bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded mx-2 flex-grow'}
                    onClick={handleClear}>
                    Clear
                </button>
                <button className={'bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded mx-2 flex-grow'}
                    onClick={handleDone}>
                    Done
                </button>
            </div>
        </div>
    );
}