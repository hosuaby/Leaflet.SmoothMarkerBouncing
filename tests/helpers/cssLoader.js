import {load as esmLoad} from '@istanbuljs/esm-loader-hook';

export function load(url, context, defaultLoad) {
    if (url.endsWith('.css')) {
        return {
            format: 'module',
            source: ''
        };
    }

    return esmLoad(url, context, defaultLoad);
}
