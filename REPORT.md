# Voxgig SDK Generator Report — Resend

Date: 2 October 2026

## Result

I generated an unofficial MIT-licensed TypeScript SDK for the Resend public API from `resend.yaml`, using Voxgig `create-sdkgen`, `apidef`, and `sdkgen`. The project configuration sets the package to `@itsmevictorhugo/resend-sdk`, the repository to `https://github.com/itsmevictorhugo/resend-sdk`, and the author to Victor Hugo.

Voxgig `apidef` parsed the definition successfully and inferred 60 entities from 72 paths and 113 HTTP methods. The generated offline suite passed: 515 tests passed, 0 failed, and 1 was skipped. The generated README and reference examples were included in that suite.

I did not make a live Resend request because no API key was available. The offline test feature deliberately uses an in-memory transport, so those passing tests validate the generated request shapes and SDK behaviour, not a live Resend account.

## What worked well

- The scaffold created a comprehensible project layout: the OpenAPI definition, a semantic model, TypeScript templates/components, generated source, docs, agent guidance, test fixtures, and a publish workflow.
- The API model captured Resend bearer authentication and its `https://api.resend.com` server automatically.
- The generated test feature is useful: it validates a large API surface and executes the documented examples without credentials or network access.
- The model-level `author`, package, and repository settings propagated to the generated TypeScript package metadata.

## Issues observed

1. **The documented scaffold cannot complete on this Windows environment.** `create-sdkgen` attempts to spawn `npm` internally; it failed with `spawn npm ENOENT`, including with `--no-install` when it reached target addition. Installing dependencies with `npm.cmd` allowed the process to continue, but that is a Windows-specific workaround.

2. **The documented generation command fails because relative paths resolve from different roots.** From `.sdk`, `npm run generate` could not find `api/api-info.aontu`; it searched `.sdk/api/...` instead of `.sdk/model/api/...`. Running `voxgig-model` from `.sdk/model` fixes model inclusion, but then the generator searches `model/tm/...` instead of `.sdk/tm/...`. I used a temporary directory junction from `model/tm` to `.sdk/tm` solely to complete this verification run, then removed it. This prevents a clean, repeatable Windows generation command.

3. **The generated TypeScript `build` script is not Windows-compatible.** It starts with `rm -rf dist dist-test`, which is not a `cmd.exe` command. I compiled and tested successfully with the equivalent `tsc --build src test` and Node test command, but `npm run build` and consequently `npm test` fail before the test suite starts on Windows.

4. **The top-level license is regenerated with `Copyright (c) 2026 Voxgig`.** The model author setting correctly affects `ts/package.json`, but the generated `LICENSE` currently uses a hard-coded Voxgig publisher. I restored the project’s requested `Copyright (c) 2026 Victor Hugo` in the committed root license; a future generation will overwrite it again. The generator needs a configurable license-holder field or should reuse the model author.

5. **Generation completed with two missing-component warnings:** `ReadmeFeatures_ts` and `AgentGuide_ts`. The offline tests passed, but the warnings should either be eliminated or documented so a user can tell whether the generated documentation is intentionally partial.

## Suggested improvements

- On Windows, spawn `npm.cmd` (or use the current Node executable’s npm path) and generate POSIX-independent package scripts.
- Resolve model includes relative to the model file while resolving templates relative to the `.sdk` project root, consistently across the pipeline.
- Expose the copyright holder as project model metadata and use it for `LICENSE`.
- Make missing optional components explicit in generation output, with an indication of whether they affect generated artifacts.

## Reproduction notes

The normal intended flow was:

```text
npm create @voxgig/sdkgen@latest -- resend -d ./resend.yaml -o . -t ts -f test
cd .sdk
npm run generate
cd ../ts
npm run build && npm test
```

On this Windows machine, the three issues above require the workarounds described in this report. No temporary junction remains in the repository.
