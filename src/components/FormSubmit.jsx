"use client";
import { useFormStatus } from 'react-dom';

export default function FormSubmit() {
    const status = useFormStatus();
    if (status.pending) {
        return <p>Submitting form...</p>
    }

    return (
        <>
            <button type="reset" className="button button-flat">
                Reset
            </button>
            <button type="submit" className="button">
                Sign up
            </button>
        </>
    )
}