/* eslint-disable no-eval */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/CalculatorStyling.css';

const Calculator = () => {
    const [input, setInput] = useState<string>('');
    const [total, setTotal] = useState<boolean>(false);
    const [history, setHistory] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const updateInput = (value: string) => {
        if ((total || error) && value !== '0') {
            setInput(value);
            setTotal(false);
            setError(null);
        } else {
            const inputValue = value;
            setInput((prev) => {
                if (prev === '0' && inputValue !== '.') {
                    return inputValue;
                }
                if ('+-*/'.includes(inputValue) && /[+\-*/]/.test(prev)) {
                    return prev;
                }
                return prev + inputValue;
            });
        }
    };
    
    useEffect(() => {
        setInput(error ? 'Err' : input || '0');
    }, [input, error]);

    const equals = () => {
        try {
            if (input.length < 3) {
                throw new Error('Invalid expression: Input sequence must have at least three characters');
            }

            const result = eval(input);
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid expression');
            }

            setHistory((prevHistory) => [...prevHistory, `${result}`]);
            setInput(result.toString());
            setTotal(true);
            setError(null);
        } catch (err) {
            setError("Invalid");
        }
    };


    const reset = () => {
        setInput('');
        setTotal(false);
        setError(null);
    };

    const deleteNum = () => {
        if(total || error){
            reset();
        }else if (input.length > 1){
            setInput((prev) => prev.slice(0, -1));
        }else{
            reset();
        }
    };

return (
    <div className="content-calculator">
        <div className="container">
            <div className="wrapper">
                <div className="screen">
                    <div className="history">
                        <ul>
                            {history.map((entry, index) => (
                                <li key={index}>{entry}</li>
                            ))}
                        </ul>
                    </div>
                    {input}
                </div>
                <div className="btn-grey" onClick={() => reset()}>
                    C
                </div>
                <div className="btn-grey" onClick={() => deleteNum()}>
                    DEL
                </div>
                <Link to="/support" className="btn-dark-orange">
                    ?
                </Link>
                <div className="btn-orange" onClick={() => updateInput('/')}>
                    /
                </div>
                <div className="btn-grey" onClick={() => updateInput('1')}>
                    1
                </div>
                <div className="btn-grey" onClick={() => updateInput('2')}>
                    2
                </div>
                <div className="btn-grey" onClick={() => updateInput('3')}>
                    3
                </div>
                <div className="btn-orange" onClick={() => updateInput('*')}>
                    X
                </div>
                <div className="btn-grey" onClick={() => updateInput('4')}>
                    4
                </div>
                <div className="btn-grey" onClick={() => updateInput('5')}>
                    5
                </div>
                <div className="btn-grey" onClick={() => updateInput('6')}>
                    6
                </div>
                <div className="btn-orange" onClick={() => updateInput('-')}>
                    -
                </div>
                <div className="btn-grey" onClick={() => updateInput('7')}>
                    7
                </div>
                <div className="btn-grey" onClick={() => updateInput('8')}>
                    8
                </div>
                <div className="btn-grey" onClick={() => updateInput('9')}>
                    9
                </div>
                <div className="btn-orange" onClick={() => updateInput('+')}>
                    +
                </div>
                <div className="btn-big-grey" onClick={() => updateInput('0')}>
                    0
                </div>
                <div className={`btn-big-orange ${input.length < 3 ? 'disabled' : ''}`} onClick={() => input.length >= 3 && equals()}>
                    =
                </div>
            </div>
        </div>
    </div>
    );
};
export default Calculator;