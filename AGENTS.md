# Permanent Rules

## agentation

- Always install `agentation` as a dev dependency (`npm install agentation -D`)
- Wire it into the app root with `{process.env.NODE_ENV === 'development' && <Agentation />}`
- Never ship it to production — the NODE_ENV guard ensures this
- This applies to every new project, every time

## npm Install Fix (Windows)

**The problem:** npm on Windows has a bug with optional native dependencies (e.g. `@rollup/rollup-win32-x64-msvc`) where the binary file can be corrupted during install or the install never completes. This causes `Error: Cannot find module @rollup/rollup-win32-x64-msvc` or npm install hangs indefinitely.

**Full recovery if it happens again:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install
```

**Preventive measures (already applied to this project):**
- `.npmrc` configured with `fund=false`, `audit=false`, `loglevel=warn` to reduce network chatter
- If npm install still hangs, run `npm install agentation -D` alone (smaller install succeeds)
- For persistent hangs, use a VPN or switch registry: `npm config set registry https://registry.npmmirror.com`
