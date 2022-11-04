# Working.... alfa

[![build-test](https://github.com/ilDug/get-tag-action/actions/workflows/test.yml/badge.svg)](https://github.com/ilDug/get-tag-action/actions/workflows/test.yml)

A GitHub action that gets pushed tag name and loads it into an action environment variable.

You can use this action within your job to get the TAG of current branch and use for tagging your workflow.

## Outputs

It generates some variables starting from the name of release or tag. In this example the actual Semver Tag is ```v2.4.15-beta.5```

```bash
#             MAJOR
#             |
#             | MINOR
#             | |
#             | | PATCH
#             | | |
RELEASE =    v2.4.15-beta.3
#           | |    |
#           | |____| VERSION
#           |      |
#           |______| TAG

```
Variables: 
####  ```DAG_RELEASE```
 -  the actual Semver Tag.   ```${{ steps.<ID>.outputs.release }}``` ) [ex.: v2.4.15-beta.3]
####  ```DAG_TAG```
 - the tag with prefix "v" ( if present ).   ```${{ steps.<ID>.outputs.tag }}``` ) [ex.: v2.4.15]
####  ```DAG_VERSION```
 - the tag without initial "v".   ```${{ steps.<ID>.outputs.version }}``` ) [ex.: 2.4.15]
####  ```DAG_MAJOR```
 - Only the Major version number.   ```${{ steps.<ID>.outputs.major }}``` ) [ex.: 2]
####  ```DAG_MINOR```
 - Only the Minor version number.   ```${{ steps.<ID>.outputs.minor }}``` ) [ex.: 4]
####  ```DAG_PATCH```
 - Only the Path version number.   ```${{ steps.<ID>.outputs.patch }}``` ) [ex.: 15]

## Usage

Should be used only when actual tag is pushed (or on publishing release ), otherwise the Action will exit with an error.


```yaml
on:
  release:
    types: [published]

  push:
    tags:  ['*']
```

### Examples
Use it to give specific names to other steps/runs
```yaml
    steps:
        - name: Checkout
          uses: actions/checkout@v3

        - name: Get Tags
          id: tag
          uses: ildug/get-tag-actiong@v1
        
        - name: My Step
          run: |
            echo ${{ steps.tag.outputs.version }}
        
        - name: Build Docker Image
          run: |
            docker build . --file Dockerfile --tag ghcr.io/someimage:$DAG_MAJOR
        
        - name:Publish package
          run: |
            npm publish --access public --tag $DAG_TAG
            
```
