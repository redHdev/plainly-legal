'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function DefaultError({
  error,
}: {
  error: Error;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 px-6">
      <h2>Something went wrong.</h2>
      <p>Please Refresh the page using the link below.</p>
      <button
        className="btn btn-primary w-auto"
        onClick={
          // Refresh the page
          () => window.location.reload()
        }
      >
        Try again
      </button>
    </div>
  );
}