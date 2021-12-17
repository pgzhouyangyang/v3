#! /bin/bash

NAME=$1

lName=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"



INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"
mkdir -p "$DIRNAME/style"
mkdir -p "$DIRNAME/__tests__"


cat > $DIRNAME/style/css.ts <<EOF
import '@zyy-v3-ui/components/style/css'
import '@zyy-v3-ui/theme-chalk/v3-${lName}.css'
EOF


cat > $DIRNAME/style/index.vue <<EOF
import '@zyy-v3-ui/components/style'
import '@zyy-v3-ui/theme-chalk/src/${lName}.scss'
EOF

cat > $DIRNAME/src/index.vue <<EOF
<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang='ts' setup>

</script>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'V3${NAME}',
})
</script>
<style>
</style>
EOF

cat <<EOF >"$DIRNAME/index.ts"
import {withInstall} from "../../utils/with-install"
import ${NAME} from './src/index.vue'

export const V3${NAME} = withInstall(${NAME})

export default {
    install: ()=> V3${NAME}.install,
    title: "",
    category: ""
}
EOF

cat > $DIRNAME/__tests__/$INPUT_NAME.spec.ts <<EOF
import { mount } from '@vue/test-utils'
import $NAME from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('$NAME.vue', () => {
  test('render test', () => {
    const wrapper = mount($NAME, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
EOF

DOCS_FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../docs" && pwd)
DOCSNAME="$DOCS_FILE_PATH/components/$lName"
mkdir -p "$DOCSNAME"
cat > "$DOCSNAME/index.md" <<EOF 
# ${NAME}
EOF
