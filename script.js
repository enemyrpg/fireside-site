// ---------------------------------------------------------------------------
// Links and the Plugin Hub switch. Change them here and nowhere else.
// ---------------------------------------------------------------------------

// Set to true once the plugin is approved. The hero button then becomes
// "Get the plugin" and opens PLUGIN_HUB_URL, and the "not on the Plugin Hub
// yet" note in the player guide disappears.
const PLUGIN_HUB_LIVE = false;
// Check this address once the plugin is listed.
const PLUGIN_HUB_URL = 'https://runelite.net/plugin-hub/show/fireside';

const LINKS = {
  server: 'https://github.com/enemyrpg/fireside',
  plugin: 'https://github.com/enemyrpg/fireside-plugin',
  docs: 'https://github.com/enemyrpg/fireside#self-hosting',
  tunnel: 'https://github.com/enemyrpg/fireside/blob/main/docs/tunnel.md',
};

// ---------------------------------------------------------------------------

for (const link of document.querySelectorAll('a[data-link]')) {
  const url = LINKS[link.dataset.link];
  if (url) link.href = url;
}

for (const button of document.querySelectorAll('[data-plugin-hub]')) {
  if (PLUGIN_HUB_LIVE) {
    button.href = PLUGIN_HUB_URL;
    button.textContent = 'Get the plugin';
    button.removeAttribute('title');
    button.classList.remove('btn-pending');
    button.classList.add('btn-secondary');
  } else {
    button.href = LINKS.plugin;
  }
}

if (PLUGIN_HUB_LIVE) {
  for (const note of document.querySelectorAll('[data-plugin-hub-note]')) note.remove();
}

// Tabs in "Getting started". Without this script both guides stay visible.
const tablist = document.querySelector('[role="tablist"]');
if (tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panelOf = (tab) => document.getElementById(tab.getAttribute('aria-controls'));

  const select = (tab, focus) => {
    for (const other of tabs) {
      const on = other === tab;
      other.setAttribute('aria-selected', String(on));
      other.tabIndex = on ? 0 : -1;
      panelOf(other).hidden = !on;
    }
    if (focus) tab.focus();
  };

  tablist.hidden = false;
  document.documentElement.classList.add('has-tabs');
  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      select(tabs[(tabs.indexOf(tab) + step + tabs.length) % tabs.length], true);
    });
  }
  select(location.hash === '#for-server-admins' ? tabs[1] : tabs[0], false);
}

// Copy buttons on the code blocks.
if (navigator.clipboard) {
  for (const block of document.querySelectorAll('.code')) {
    const code = block.querySelector('code');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy';
    button.textContent = 'Copy';
    button.setAttribute('aria-live', 'polite');
    let timer;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Copy failed';
      }
      clearTimeout(timer);
      timer = setTimeout(() => (button.textContent = 'Copy'), 2000);
    });
    block.querySelector('.code-head').append(button);
  }
}
