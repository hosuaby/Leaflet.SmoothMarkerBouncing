export default function styleInject(css, options) {
    var insertAt = options ? options.insertAt : null;

    if (!css || typeof document === 'undefined') {
        return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(css))

    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild)
        } else {
            head.appendChild(style)
        }
    } else {
        head.appendChild(style)
    }
}
