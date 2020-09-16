import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Table from '../components/Table';
import Toolbar from '../components/Toolbar';

export default function Home() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(2);
  const [expressions, setExpressions] = useState([]);
  const [truthValues, setTruthValues] = useState([]);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);
  const [latex, setLatex] = useState('');
  const textAreaRef = useRef(null);

  const getTruthValues = cell => {
    const found = truthValues.find(truthValue => truthValue.row === cell.row && truthValue.col === cell.col);
    if (found) {
      const newState = truthValues.filter(truthValue => truthValue.row !== cell.row || truthValue.col !== cell.col);

      newState.push(cell);

      setTruthValues(newState);
    } else {
      setTruthValues([...truthValues, cell]);
    }
  }

  useEffect(() => {
    let latexString = '\\begin{tabular}{';

    for (let i = 0; i < cols; i++) {
      latexString += ' | c';
    }
    latexString += ' | }\n';
    latexString += '\\hline\n';
    for (let i = 0; i < cols; i++) {
      const found = expressions.find(expression => expression.col === i);
      let headerString = '';
      if (!found) {
        headerString += ' ';
      } else {
        headerString += found.expression;
      }
      headerString = i === cols - 1 ? headerString : headerString + '& ';

      latexString += headerString;
    }
    latexString += '\\\\ \n';
    latexString += '\\hline\n';
    //rows
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const found = truthValues.find(truthValue => truthValue.row === i && truthValue.col === j);

        const cellIsFalse = !!found && !found.truthValue;

        latexString += cellIsFalse ? 'F ' : 'T ';

        if (j < cols - 1) {
          latexString += '& '
        }
      }
      latexString += '\\\\ \n'
    }
    latexString += '\\hline\n';
    latexString += '\\end{tabular}';

    setLatex(latexString);
  }, [cols, expressions, truthValues]);

  const upateExpression = update => {
    if (currentlyEditing === null || currentlyEditing === undefined) {
      return;
    }

    const found = expressions.find(expression => expression.col === currentlyEditing);
    if (found) {
      const newExpression = { expression: found.expression + update.expression };

      const newState = expressions.filter(expression => expression.col !== currentlyEditing);

      newState.push(Object.assign(newExpression, { col: currentlyEditing }));

      setExpressions(newState);
    } else {
      addExpression(Object.assign(update, { col: currentlyEditing }));
    }
  }

  const backspace = () => {
    if (currentlyEditing === null || currentlyEditing === undefined) {
      return;
    }

    const found = expressions.find(expression => expression.col === currentlyEditing);

    const newExpression = found.expression.split(' ');

    newExpression.splice(-2, 2);

    const newState = expressions.filter(expression => expression.col !== currentlyEditing);

    newState.push(Object.assign({ expression: newExpression.join(' ') + ' ' }, { col: currentlyEditing }));

    setExpressions(newState);
  }

  const clear = () => {
    if (currentlyEditing === null || currentlyEditing === undefined) {
      return;
    }

    const found = expressions.find(expression => expression.col === currentlyEditing);
    if (found) {
      const newState = expressions.filter(expression => expression.col !== currentlyEditing);

      newState.push(Object.assign({ expression: '' }, { col: currentlyEditing }));

      setExpressions(newState);
    }
  }

  const done = () => {
    setCurrentlyEditing(null);
  }

  const addExpression = newExpression => {
    const newState = [...expressions];

    newState.push(newExpression);

    setExpressions(newState);
  }

  const handleCopy = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
  }

  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto mt-10 select-none'>
        <p className='text-white text-3xl tracking-tighter font-semibold px-4'>Truth Table Generator</p>


        <div className='flex sm:flex-row flex-col mt-4 px-4'>
          <div className='flex flex-col justify-evenly w-40 rounded border px-4 sm:py-0 py-4'>
            <div className='flex items-center sm:mb-0 mb-4'>
              <div className='w-1/2'>
                <label className='block text-white font-bold text-center' htmlFor='rows'>
                  Rows
              </label>
              </div>
              <div className=''>
                <input
                  id='rows'
                  onChange={e => setRows(Number(e.target.value))}
                  type='number'
                  value={rows}
                  min='1'
                  max='16'
                  className='text-white bg-gray-800 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500'
                />
              </div>
            </div>
            <div className='flex items-center'>
              <div className='w-1/2'>
                <label className='block text-white font-bold text-center' htmlFor='columns'>
                  Cols
              </label>
              </div>
              <div className=''>
                <input
                  id='columns'
                  onChange={e => setCols(Number(e.target.value))}
                  type='number'
                  value={cols}
                  min='1'
                  max='16'
                  className='text-white bg-gray-800 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500'
                />
              </div>
            </div>
          </div>

          <div className='sm:ml-6 sm:mt-0 mt-4'>
            <Toolbar
              upateExpression={upateExpression}
              backspace={backspace}
              clear={clear}
              done={done}
            />
          </div>

        </div>


        <div className='flex flex-col px-4'>
          <div className='flex'>
            <Table
              rows={rows}
              cols={cols}
              currentlyEditing={currentlyEditing}
              setCurrentlyEditing={setCurrentlyEditing}
              expressions={expressions}
              getTruthValues={getTruthValues}
            />
            <span
              className='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer rounded-full w-8 h-8 flex justify-center items-center ml-4 my-auto'
              onClick={() => {
                if (cols < 16) {
                  setCols(cols + 1);
                }
              }}>
              <span className='text-white text-bold text-4xl mb-2'>+</span>
            </span>
          </div>
          <div className='ml-2 mt-4'>
            <span
              className='bg-blue-500 hover:bg-blue-700 hover:cursor-pointer rounded-full w-8 h-8 flex justify-center items-center'
              onClick={() => {
                if (rows < 16) {
                  setRows(rows + 1);
                }
              }}>
              <span className='text-white text-bold text-4xl mb-2'>+</span>
            </span>
          </div>
        </div>

        <div className='w-3/4 px-4'>
          <div className='flex justify-between'>
            <p className='text-white text-2xl tracking-tighter font-semibold mt-10 mb-1'>LaTeX</p>
            <button
              onClick={handleCopy}
              className='text-white self-end border rounded px-1 hover:bg-gray-600 mb-2'>
              <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
          </div>
          <textarea
            value={latex}
            ref={textAreaRef}
            className='w-full h-64 bg-gray-200'
            readOnly />
        </div>
      </main>
    </div>
  )
}
