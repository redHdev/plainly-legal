'use client'; // Error components must be Client components

import DefaultError from "~/components/DefaultError";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return <DefaultError error={error} reset={reset} />;
}

