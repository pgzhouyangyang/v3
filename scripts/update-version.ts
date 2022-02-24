import fs from 'fs'
import path from 'path'
import selectV from 'select-version-cli/src/selectVersion'
import { epPackage } from '../build/utils/paths'
import { cyan, red, yellow, green } from '../build/utils/log'
import { getPackageManifest } from '../build/utils/pkg'

selectV().then((res) => {
  const tagVersion = res
  if (!tagVersion) {
    red(
      'No tag version or git head were found, make sure that you set the environment variable $TAG_VERSION \n'
    )
    process.exit(1)
  }

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/src/version.ts'),
    `export const version = '${tagVersion}'
      `
  )

  cyan('Start updating version')

  cyan(['NOTICE:', `$TAG_VERSION: ${tagVersion}`].join('\n'))
  ;(async () => {
    yellow(`Updating package.json`)

    const json: Record<string, any> = getPackageManifest(epPackage)

    json.version = tagVersion

    if (!(process.argv.includes('-d') || process.argv.includes('--dry-run'))) {
      try {
        await fs.promises.writeFile(epPackage, JSON.stringify(json, null, 2), {
          encoding: 'utf-8',
        })
      } catch (e) {
        process.exit(1)
      }
    } else {
      console.log(json)
    }

    green(`Version updated to ${tagVersion}`)
  })()
})
