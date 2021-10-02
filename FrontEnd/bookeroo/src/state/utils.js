/**
 * Retrieves the numeric ID from the url to a resource.
 * @param {string|URL} href The URL to retrive the id from.
 */
export function idFromURL(href) {
    const url = new URL(href, document.location.href);
    const id = url.pathname.split('/').pop();
    if (!id.match(/^\d+$/))
        throw new TypeError(
            `Invalid identifier URI '${url}'. ID portion non-numeric: '${id}'`
        );
    return id;
}
