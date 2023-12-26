"use client"

interface ErrorPageProps {
    error: Error,
    reset: () => void,
}

export default function Error({error, reset}: ErrorPageProps) {
    return(
        <div>
            <p>{error.message}</p>
            <p>{error.stack}</p>
            <button onClick={reset}>Try again</button>
        </div>
    )
}