function rdbd_addClassToTags(tags, classname) {
    for (let t of tags) {
        let nodes = document.getElementsByTagName(t);
        for (let node of nodes) {
            if (node.id != "readingbuddiesRuler" && node.id != "readingbuddiesOverlay") {
                node.classList.add(classname);
            }
        }
    }
}

function rdbd_removeClassFromTags(tags, classname) {
    for (let t of tags) {
        let nodes = document.getElementsByTagName(t);
        for (let node of nodes) {
            node.classList.remove(classname);
        }
    }
}

function rdbd_insertSpacingStyle(property, val, selectors, important=false) {
    rdbd_removeSpacingStyle(property);

    let toolName = 'Spacing';
    let cssVars = {
        'word-spacing': '--rdbd_wordsp',
        'letter-spacing': '--rdbd_lettersp'
    };

    let stylenode = document.createElement('style');
    stylenode.id = `readingbuddies${toolName}_style_${property}`;

    for (s in selectors) {
        s = `${s}:not(#readingbuddiesRuler):not(readingbuddiesOverlay)`;
    }
    let selectors_str = selectors.join(',');

    let inlinestyles =
        `:root{
            ${cssVars[property]}:${val};
        }
        ${selectors_str} {
            ${property}:var(${cssVars[property]}) ${important ? '!important' : ''};
        }`;

    stylenode.appendChild(document.createTextNode(inlinestyles));
    document.getElementsByTagName('head')[0].appendChild(stylenode);
}

function rdbd_removeSpacingStyle(property) {
    let stylenode = document.getElementById(`readingbuddiesSpacing_style_${property}`);
    if (stylenode != null) {
        stylenode.parentNode.removeChild(stylenode);
    }
}

function rdbd_updateSpacing(input) {
    let tags = [
        'body'
        // 'p', 'ol', 'ul'
    ];

    for (let [cName, cItems] of Object.entries(input['children'])) {
        let classname = `readingbuddiesSpacing_styled_${cName}`;
        let selectors = [ `.${classname} *`, `.${classname} a:link`, `.${classname} a:visited` ];
        let important = true;

        if (cItems['active'] && !input['disabled']) {
            let val = `${cItems['spacing']}em`;
            rdbd_removeClassFromTags(tags, classname);
            rdbd_addClassToTags(tags, classname);
            rdbd_insertSpacingStyle(cName, val, selectors, important);
        }
        else {
            rdbd_removeClassFromTags(tags, classname);
            rdbd_removeSpacingStyle(cName);
        }
    }
}

rdbd_updateSpacing(rdbdInput_spacing);
