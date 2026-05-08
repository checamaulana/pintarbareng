import { createInertiaApp } from '@inertiajs/react';
import { Agentation } from 'agentation';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initEcho } from '@/lib/echo';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'PintarBareng';

// Init Laravel Echo / Reverb
initEcho();

createInertiaApp({
    title: (title) => (title ? `${title} — ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                {import.meta.env.DEV && <Agentation />}
            </>,
        );
    },
    progress: {
        color: '#6366F1',
        showSpinner: true,
    },
});
