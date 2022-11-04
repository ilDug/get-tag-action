import { tagSet } from './tagSet';

export default (ref: string): tagSet => {
    let release: string;
    let tag: string;
    let version: string;
    let major: string;
    let minor: string;
    let patch: string;

    const prefix = 'refs/tags/';

    if (!ref)
        throw "REF not defined";
    if (!ref.startsWith(prefix))
        throw `Not a tag ref (${ref})`;

    release = ref.replace(/^refs\/tags\//, "");
    const tagRegex = new RegExp(/v?([\d*][\.\d*]*)/i);
    tag = release.match(tagRegex)![0] ?? null;
    tag = tag.toLowerCase();
    version = tag.startsWith("v") ? tag.replace(/^v/, "") : tag;
    const parts = version.split('.');
    major = parts[0];
    minor = parts[1] ?? null;
    patch = parts[2] ?? null;

    return {
        release: release,
        tag: tag,
        version: version,
        major: major,
        minor: minor,
        patch: patch
    }
}