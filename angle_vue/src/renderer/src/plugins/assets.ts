import 'katex/dist/katex.min.css';
import '@renderer/styles/lib/tailwind.css';
import '@renderer/styles/lib/highlight.less';
import '@renderer/styles/lib/github-markdown.less';
import '@renderer/styles/global.less';
import '@renderer/assets/iconfont/iconfont.js';
import 'animate.css';
import 'ant-design-vue/dist/antd.variable.min.css';

/** Tailwind's Preflight Style Override */
function naiveStyleOverride() {
  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);
}

function setupAssets() {
  naiveStyleOverride();
}

export default setupAssets;
