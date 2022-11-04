import * as core from '@actions/core';
import * as github from '@actions/github';
import getTag from './getTag'

async function run(): Promise<void> {
    try {
        const ref = github.context.ref

        core.debug("Getting REF from branch")

        const { release, tag, version, major, minor, patch } = getTag(ref);
        core.debug("Setting outputs:")

        core.exportVariable('DAG_RELEASE', release);
        core.setOutput('release', release);
        core.debug(`[DAG_RELEASE] release: ${release}`);

        core.exportVariable('DAG_TAG', tag);
        core.setOutput('tag', tag);
        core.debug(`[DAG_TAG] tag: ${tag}`);

        core.exportVariable('DAG_VERSION', version);
        core.setOutput('version', version);
        core.debug(`[DAG_VERSION] version: ${version}`);

        core.exportVariable('DAG_MAJOR', major);
        core.setOutput('major', major);
        core.debug(`[DAG_MAJOR] major: ${major}`);

        core.exportVariable('DAG_MINOR', minor);
        core.setOutput('minor', minor);
        core.debug(`[DAG_MINOR] minor: ${minor}`);

        core.exportVariable('DAG_PATCH', patch);
        core.setOutput('patch', patch);
        core.debug(`[DAG_PATCH] patch: ${patch}`);


    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message)
    }
}

run()