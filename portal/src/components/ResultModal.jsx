import { ForwardedRef, forwardRef } from "react";
import { createPortal } from "react-dom";
const ResultModal = forwardRef(
    function ResultModal({ timeRemaining, targetTime, onReset}, ref) {
        const userLost = timeRemaining<=0;
        const score = Math.round((1 - (timeRemaining / (targetTime * 1000)))*100);
        return createPortal(<dialog ref={ref} className="result-modal" onClose={onReset}>
            <h2>You {userLost ? 'lost!' : 'won with score: ' + score}</h2>
            <p>The target time was <strong>{targetTime} seconds</strong>.</p>
            {userLost ?
                <p>You failed to stop the timer in time.</p> :
                <p>You stopped the timer with <strong>{(timeRemaining / 1000).toFixed(2)} seconds left</strong>.</p>}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>, document.getElementById('modal'));
    }
);
export default ResultModal;