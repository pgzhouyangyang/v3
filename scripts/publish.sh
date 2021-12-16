#!/bin/sh

set -e
pnpm update:version

pnpm build

cd dist/zyy-v3-ui
npm publish
cd -

echo "✅ Publish completed"
