import { useState } from 'react';
import Head from 'next/head';
import Table from '../components/Table';
import Toolbar from '../components/Toolbar';

export default function Home() {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [expressions, setExpressions] = useState([]);
  const [currentlyEditing, setCurrentlyEditing] = useState(null);

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

  const removeExpression = col => {
    const newState = expressions.filter(expression => expression.id !== col);
  }

  return (
    <div className=''>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto mt-10'>
        <p className='text-white text-3xl tracking-tighter font-semibold'>Truth Table Generator</p>


        <div className='flex mt-4'>
          <div className='flex flex-col justify-evenly w-40 rounded border px-2'>
            <div className='flex items-center'>
              <div className='w-1/2'>
                <label className='block text-white font-bold text-right pr-4' htmlFor='rows'>
                  Rows
              </label>
              </div>
              <div className='w-1/2'>
                <input
                  id='rows'
                  onChange={e => setRows(Number(e.target.value))}
                  type='number'
                  value={rows}
                  min='1'
                  max='12'
                  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                />
              </div>
            </div>
            <div className='flex items-center'>
              <div className='w-1/2'>
                <label className='block text-white font-bold text-right pr-4' htmlFor='columns'>
                  Columns
              </label>
              </div>
              <div className='w-1/2'>
                <input
                  id='columns'
                  onChange={e => setCols(Number(e.target.value))}
                  type='number'
                  value={cols}
                  min='1'
                  max='12'
                  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                />
              </div>
            </div>
          </div>

          <div className='ml-6'>
            <Toolbar
              upateExpression={upateExpression}
              backspace={backspace}
              clear={clear}
              done={done}
            />
          </div>

        </div>


        <div className=''>
          <Table
            rows={rows}
            cols={cols}
            currentlyEditing={currentlyEditing}
            setCurrentlyEditing={setCurrentlyEditing}
            expressions={expressions}
          />
        </div>

        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
          LaTeX
        </button> */}
      </main>
    </div>
  )
}
