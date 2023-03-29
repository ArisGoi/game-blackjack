let deferredPrompt;
const installButton = document.getElementById('installButton');

// Verifica se il browser supporta l'installazione di web app
if ('onbeforeinstallprompt' in window) {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.removeAttribute('hidden');
    });
} else {
    alert('Il tuo browser non supporta l\'installazione di web app');
}

// Funzione per gestire il click sul pulsante di installazione
installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`Risultato dell'installazione: ${outcome}`);
        deferredPrompt = null;
        installButton.setAttribute('hidden', true);
    } else {
        alert('Impossibile installare l\'app');
    }
});
