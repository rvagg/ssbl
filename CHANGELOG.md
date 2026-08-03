## [2.0.13](https://github.com/rvagg/ssbl/compare/v2.0.12...v2.0.13) (2026-08-03)

### Trivial Changes

* **deps-dev:** bump @semantic-release/changelog from 6.0.3 to 7.0.0 ([#16](https://github.com/rvagg/ssbl/issues/16)) ([16b75e3](https://github.com/rvagg/ssbl/commit/16b75e36d65fe270cf6f0136d4ab689ad6aba098))

## [2.0.12](https://github.com/rvagg/ssbl/compare/v2.0.11...v2.0.12) (2026-08-03)

### Trivial Changes

* **deps:** bump the github-actions-minor-patch group with 2 updates ([#15](https://github.com/rvagg/ssbl/issues/15)) ([9868c12](https://github.com/rvagg/ssbl/commit/9868c12170d15db400243957a27afa1124f56e62))

## [2.0.11](https://github.com/rvagg/ssbl/compare/v2.0.10...v2.0.11) (2026-07-30)

### Trivial Changes

* downgrade broken changelog maker, backfill entries ([#14](https://github.com/rvagg/ssbl/issues/14)) ([5d09377](https://github.com/rvagg/ssbl/commit/5d093772145e171ae67a5733e3ad7676adf07bb5))

## [2.0.10](https://github.com/rvagg/ssbl/compare/v2.0.9...v2.0.10) (2026-07-29)

### Trivial Changes

* **deps-dev:** bump typescript from 6.0.3 to 7.0.2 ([1355254](https://github.com/rvagg/ssbl/commit/135525420b62bb86a3b12b56b0ed1d6cd9cdd73e))
* updates for ts@7 ([dc1683c](https://github.com/rvagg/ssbl/commit/dc1683c3bdf9ca59d8a9070c0a1a96ebc58e6c52))

## [2.0.9](https://github.com/rvagg/ssbl/compare/v2.0.8...v2.0.9) (2026-07-27)

### Trivial Changes

* **deps:** bump the github-actions-minor-patch group with 2 updates ([#13](https://github.com/rvagg/ssbl/issues/13)) ([73cf7fe](https://github.com/rvagg/ssbl/commit/73cf7fe28e313209e15b78d9008cd8db008d758b))

## [2.0.8](https://github.com/rvagg/ssbl/compare/v2.0.7...v2.0.8) (2026-07-21)

### Trivial Changes

* **ci:** slow down dependabot, add depsound, pin actions by hash ([#12](https://github.com/rvagg/ssbl/issues/12)) ([87e9ef8](https://github.com/rvagg/ssbl/commit/87e9ef82e944aef9c76fea869eea93c60bb25756))

## [2.0.7](https://github.com/rvagg/ssbl/compare/v2.0.6...v2.0.7) (2026-07-20)

### Trivial Changes

* **deps:** bump actions/setup-node from 6 to 7 ([#10](https://github.com/rvagg/ssbl/issues/10)) ([134debd](https://github.com/rvagg/ssbl/commit/134debd6b04d346b9540c0b25bff4e6d6c96e981))

## [2.0.6](https://github.com/rvagg/ssbl/compare/v2.0.5...v2.0.6) (2026-07-06)

### Trivial Changes

* **deps-dev:** bump conventional-changelog-conventionalcommits ([#9](https://github.com/rvagg/ssbl/issues/9)) ([29878f7](https://github.com/rvagg/ssbl/commit/29878f75dd66d8b31fdb6ebba9cf8e4dc79bf0e2))

## [2.0.5](https://github.com/rvagg/ssbl/compare/v2.0.4...v2.0.5) (2026-07-06)

### Trivial Changes

* **deps-dev:** bump @types/node from 25.9.4 to 26.0.1 ([#8](https://github.com/rvagg/ssbl/issues/8)) ([2efcb16](https://github.com/rvagg/ssbl/commit/2efcb16ae36cb278262dd7aaaffa2b8a6a93343d))

## [2.0.4](https://github.com/rvagg/ssbl/compare/v2.0.3...v2.0.4) (2026-06-29)

### Trivial Changes

* **deps:** bump actions/checkout from 6.0.3 to 7.0.0 ([#7](https://github.com/rvagg/ssbl/issues/7)) ([ec853d7](https://github.com/rvagg/ssbl/commit/ec853d7ce3c7b20fbb7929f0ac4f2d1fa6b216e8))

## [2.0.3](https://github.com/rvagg/ssbl/compare/v2.0.2...v2.0.3) (2026-06-22)

### Trivial Changes

* **deps:** bump actions/checkout from 6 to 6.0.3 ([#6](https://github.com/rvagg/ssbl/issues/6)) ([802365c](https://github.com/rvagg/ssbl/commit/802365cbf29dff71596130c4f17612042730c788))

## [2.0.2](https://github.com/rvagg/ssbl/compare/v2.0.1...v2.0.2) (2026-03-30)

### Trivial Changes

* **deps-dev:** bump typescript from 5.9.3 to 6.0.2 ([53b7893](https://github.com/rvagg/ssbl/commit/53b78936868ec7e17fa0995359483e2063a879f6))
* update deps & upgrade to typescript 6 ([9ad7920](https://github.com/rvagg/ssbl/commit/9ad79208b421d1fc0f12cdd652aff1d4af0d3746))

## [2.0.1](https://github.com/rvagg/ssbl/compare/v2.0.0...v2.0.1) (2026-01-24)

### Trivial Changes

* udpate dep ([#3](https://github.com/rvagg/ssbl/issues/3)) ([4c9210c](https://github.com/rvagg/ssbl/commit/4c9210cff9bfc705e651c9c85c3f79689cd514c7))

## [2.0.0](https://github.com/rvagg/ssbl/compare/v1.0.2...v2.0.0) (2026-01-24)

### ⚠ BREAKING CHANGES

* Package is now ESM-only. API changed from
`ssbl(dir, callback)` to `await ssbl(dir)`.

### Features

* modernise to ESM with async API ([#2](https://github.com/rvagg/ssbl/issues/2)) ([8bc7077](https://github.com/rvagg/ssbl/commit/8bc7077dd5e13ce5707c9e20c0caab1a0fe13517))
