import { expect, test } from '@jest/globals'
import getTag from '../src/getTag'



test("should return Null or Empty for each results", async () => {
    const ref = "refs/tags/"
    const res = getTag(ref);
    let results = Object.values(res)
    for (const key of results) {
        expect(key).toBeFalsy()
    }
})

test("should have release", async () => {
    const base = "refs/tags/"
    const t = "v1.2.3-beta.4"
    const ref = base + t
    const { release } = getTag(ref);
    expect(release).toBe(t)
})

test("should have tag and version", async () => {
    const ref = "refs/tags/1.2.3-beta.4"
    const { tag, version } = getTag(ref);
    expect(tag).toBe(version)
})

test("should hpass MAJOR MINOR PATCH rule", async () => {
    const ref = "refs/tags/v1.2.33-beta.4"
    const { minor, major, patch } = getTag(ref);
    expect(major).toBe("1")
    expect(minor).toBe("2")
    expect(patch).toBe("33")
})



test("should throws for No TAGS", async () => {
    const base = "refs/branch"
    expect(() => getTag(base)).toThrow(Error)
})



test("should throws for empty ref", async () => {
    expect(getTag).toThrow(Error)
})

