import { defineConfig, presetIcons } from 'unocss';

export default defineConfig({
	presets: [
		presetIcons({
			// https://unocss.dev/presets/icons#prefix
			prefix: '',
			// https://iconify.design/docs/usage/css/unocss/#icon-size
			scale: 1.2
		})
	]
});
