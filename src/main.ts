import * as core from '@actions/core';
import * as github from '@actions/github';

async function run(): Promise<void> {
    try {
        let release: string;
        let tag: string;
        let version: string;
        let major: string;
        let minor: string;
        let patch: string;

        const ref = github.context.ref
        const prefix = 'refs/tags/'

        if (!ref)
            throw "REF not defined"
        if (!ref.startsWith(prefix))
            throw `Not a tag ref (${ref})`

        release = ref.replace(/^refs\/tags\//, "")
        const tagRegex = new RegExp(/v?([\d*][\.\d*]*)/i)
        tag = release.match(tagRegex)![0] ?? ""
        tag = tag.toLowerCase();
        version = tag.startsWith("v") ? tag.replace(/^v/, "") : tag
        const parts = version.split('.')
        major = parts[0]
        minor = parts[1] ?? ""
        patch = parts[2] ?? ""


        core.exportVariable('DAG_RELEASE', release)
        core.setOutput('release', release)

        core.exportVariable('DAG_TAG', tag)
        core.setOutput('tag', tag)

        core.exportVariable('DAG_VERSION', version)
        core.setOutput('version', version)

        core.exportVariable('DAG_MAJOR', major)
        core.setOutput('major', major)

        core.exportVariable('DAG_MINOR', minor)
        core.setOutput('minor', minor)

        core.exportVariable('DAG_PATCH', patch)
        core.setOutput('patch', patch)


    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()