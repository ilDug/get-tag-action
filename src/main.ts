import * as core from '@actions/core';
import * as github from '@actions/github';
import getTag from './getTag'

async function run(): Promise<void> {
    try {
        const ref = github.context.ref

        const { release, tag, version, major, minor, patch } = getTag(ref);

        core.exportVariable('DAG_RELEASE', release);
        core.setOutput('release', release);

        core.exportVariable('DAG_TAG', tag);
        core.setOutput('tag', tag);

        core.exportVariable('DAG_VERSION', version);
        core.setOutput('version', version);

        core.exportVariable('DAG_MAJOR', major);
        core.setOutput('major', major);

        core.exportVariable('DAG_MINOR', minor);
        core.setOutput('minor', minor);

        core.exportVariable('DAG_PATCH', patch);
        core.setOutput('patch', patch);

    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()