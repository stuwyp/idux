/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { selectToken } from '../token'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      isDisabled,
      inputRef,
      inputValue,
      inputWidth,
      mirrorRef,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
    } = inject(selectToken)!

    const style = computed(() => ({ width: inputWidth.value }))

    const innerStyle = computed(() => {
      const { allowInput, searchable } = props
      const isOpacity = allowInput || searchable
      return { opacity: isOpacity ? undefined : 0 }
    })

    return () => {
      const { autofocus, multiple } = props
      const prefixCls = `${mergedPrefixCls.value}-selector-input`
      return (
        <div class={prefixCls} style={style.value}>
          <input
            ref={inputRef}
            class={`${prefixCls}-inner`}
            style={innerStyle.value}
            autocomplete="off"
            autofocus={autofocus}
            disabled={isDisabled.value}
            value={inputValue.value}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
            onInput={handleInput}
          />
          {multiple && <span ref={mirrorRef} class={`${prefixCls}-mirror`} aria-hidden></span>}
        </div>
      )
    }
  },
})
