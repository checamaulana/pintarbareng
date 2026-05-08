import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: Echo<'reverb'>;
    }
}

/**
 * Inisialisasi Laravel Echo dengan Reverb driver.
 * Dipanggil satu kali saat app di-boot.
 */
export function initEcho(): Echo<'reverb'> {
    window.Pusher = Pusher;

    const echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST ?? 'localhost',
        wsPort: parseInt(import.meta.env.VITE_REVERB_PORT ?? '8080'),
        wssPort: parseInt(import.meta.env.VITE_REVERB_PORT ?? '443'),
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
        enabledTransports: ['ws', 'wss'],
        disableStats: true,
    });

    window.Echo = echo;
    return echo;
}
