const themes = {
    "dk-green": ["var(--theme_dk-green)",   "var(--theme_dk-green_secondary)"],
    "lt-green": ["var(--theme_lt-green)",   "var(--theme_lt-green_secondary)"],
    "yellow":   ["var(--theme_yellow)",     "var(--theme_yellow_secondary)"],
    "orange":   ["var(--theme_orange)",     "var(--theme_orange_secondary)"],
    "red":      ["var(--theme_red)",        "var(--theme_red_secondary)"],
    "pink":     ["var(--theme_pink)",       "var(--theme_pink_secondary)"],
    "lavender": ["var(--theme_lavender)",   "var(--theme_lavender_secondary)"],
    "purple":   ["var(--theme_purple)",     "var(--theme_purple_secondary)"],
    "blue":     ["var(--theme_blue)",       "var(--theme_blue_secondary)"],
    "teal":     ["var(--theme_teal)",       "var(--theme_teal_secondary)"]
}


function updateTheme(theme) {
    let root = document.documentElement;
    let [primary_color, secondary_color] = themes[theme];
    root.style.setProperty('--awake-primary', primary_color);
    root.style.setProperty('--awake-secondary', secondary_color);
}

function constructThemeButtons(themeColors) {
    let buttonsDiv = document.getElementById('themeButtons');
    for (let [theme, [primary_color, secondary_color]] of Object.entries(themes)) {
        let button = document.createElement('button');
        button.style.backgroundColor = primary_color;
        button.setAttribute('value', theme);
        button.classList.add('color-button');
        button.addEventListener('click', function(event) {
            let theme = event.target.value;
            updateTheme(theme);
            chrome.storage.local.get(['readingbuddiesData'], function(result) {
                data = result['readingbuddiesData'];
                data['theme']['primary-color'] = primary_color;
                data['theme']['secondary-color'] = secondary_color;
                data['theme']['name'] = theme;
                chrome.storage.local.set({'readingbuddiesData': data},
            chrome.runtime.sendMessage({'updateApp': 'updateIcon'}));
            });
        });
    buttonsDiv.appendChild(button);
  }
}

constructThemeButtons(themes);
