'use client'; // Error components must be Client components

import DefaultError from "~/components/DefaultError";

export default function Error({ error }: { error: Error }) {
    return <DefaultError error={error} />;
}

