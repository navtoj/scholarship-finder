## Developing

Once you've cloned the project and installed dependencies with `bun install` (or `npm install` or `yarn`), start a development server:

```bash
bun dev

# or start the server and open the app in a new browser tab
bun dev --open
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
