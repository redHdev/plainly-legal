export function humanReadableDate(isoDateStr: string, customOptions?: Partial<Intl.DateTimeFormatOptions>): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const options = { ...defaultOptions, ...customOptions };
    
    const date = new Date(isoDateStr);

    return date.toLocaleDateString('en-US', options);
}