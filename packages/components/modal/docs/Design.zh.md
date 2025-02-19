需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `IxModal` 在当前页面正中打开一个浮层，承载相应的操作。

另外当需要一个简洁的对话框询问或提示用户时，可以使用精心封装好的 `useModal` 等方法。

推荐使用封装好的组件 (`Component`) 作为 `IxModal` 的默认插槽，或 `useModal` 的 `content` 参数，这样 `Component` 内的逻辑可以完全隔离、并且可以做到随时复用。

在 `Component` 中可以注入 `MODAL_TOKEN`, 以获取对话框组件的方法，用于控制对话框的行为。
