import { useState, useRef } from "react"
import ResultModal from "./ResultModal";

export function TimerChallenge({ title, targetTime }) {

    const timer = useRef();
    const resultModal = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    let isTimerActive = timeRemaining > 0 && timeRemaining < targetTime*1000;
    if (timeRemaining<=0){
        clearInterval(timer.current);
        resultModal.current.showModal();
    }

    function onReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining-10);
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        resultModal.current.showModal();
    }


    return <>
        <ResultModal ref={resultModal} timeRemaining={timeRemaining} targetTime={targetTime} onReset={onReset}/>
        <section className="challenge">
            <h2>{title}</h2>
            {/* {!isTimerActive && <p>You lost!</p>} */}
            <p className="challenge-time">
                {targetTime} sesond{targetTime === 1 ? '' : 's'}
            </p>
            <p>
                <button onClick={isTimerActive ? handleStop : handleStart}>{isTimerActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={isTimerActive ? 'active' : ''}>
                {isTimerActive ? 'Time is running..' : 'Timer inactive'}
            </p>
        </section>
    </>
}