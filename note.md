# previous solution

```yaml
    - name: Get the version
      id: tag
      run: echo "VERSION=${GITHUB_REF/refs\/tags\//}" >> $GITHUB_OUTPUT       
      # run: echo ::set-output name=VERSION::${GITHUB_REF/refs\/tags\//}   
```