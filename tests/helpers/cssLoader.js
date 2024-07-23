export function load(url, context, defaultLoad) {
    if (url.endsWith('.css')) {
        return {
            format: 'module',
            source: ''
        };
    }

    return defaultLoad(url, context, defaultLoad);
}
