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

function rdbd_insertFontStyle(property, val, selectors, important=false) {
    rdbd_removeFontStyle(property);

    let cssVars = {
        'font-size': '--rdbd_font_size',
        'color': '--rdbd_font_color',
        'font-family': '--rdbd_font_family',
        'font-weight': '--rdbd_font_weight',
        'background-color': '--rdbd_bkgr_color'
    };

    let stylenode = document.createElement('style');
    stylenode.id = `readingbuddiesFont_style_${property}`;

    for (s in selectors) {
        s = `${s}:not(#readingbuddiesRuler):not(readingbuddiesOverlay)`;
    }
    let selectors_str = selectors.join(',');

    let inlinestyles =
        `:root {
            ${cssVars[property]}:${val};
        }
        ${selectors_str} {
            ${property}:var(${cssVars[property]}) ${important ? '!important' : ''};
        }`;

    stylenode.appendChild(document.createTextNode(inlinestyles));
    document.getElementsByTagName('head')[0].appendChild(stylenode);
}

function rdbd_removeFontStyle(property) {
    let stylenode = document.getElementById(`readingbuddiesFont_style_${property}`);
    if (stylenode != null) {
        stylenode.parentNode.removeChild(stylenode);
    }
}

function rdbd_updateFont(input) {
    let all_tags = [
        'root', 'html',
        'body',
        'div',
        'p',
        'ul', 'ol',
        // 'li',
        // 'h1','h2','h3', 'h4', 'h5', 'h6',
        'table', 'tr', 'th', 'td',
        // 'a', 'b', 'em', 'strong',
        // 'small', 'label',
        // 'span',
        // 'blockquote', 'section', 'article',
        // 'cite', 'code', 'sub', 'sup'
    ];
    // let exclude_tags = [
    //     'img', 'svg', 'video', 'source'
    // ];

    for (let [cName, cItems] of Object.entries(input['children'])) {
        let val = '';
        let classname = `readingbuddiesFont_styled_${cName}`;
        let selectors = [];
        let tags = null;
        let important = false;
        let active = cItems['active'];

        if (cName == 'font-size') {
            important = true;
            selectors = [`.${classname} *`];
            tags = [
                'root', 'html',
                'body',
                // 'div',
                // 'p'
                // 'ul', 'ol'
                // 'a', 'b', 'em', 'strong',
                // 'span',
                // 'blockquote', 'section', 'article',
                // 'cite', 'code',
                // 'table', 'tr', 'th', 'td',
                // 'h1','h2','h3', 'h4', 'h5', 'h6',
            ];
            if (cItems['rivals'] && cItems['rivals'][0] == 'factor') {
                val =  `${cItems['factor']}%`;
            }
            else {
                val = `${cItems['size']}pt`;
            }
        }

        else if (cName == 'font-family') {
            important = true;
            selectors = [`.${classname} *`];
            tags = [
                'root', 'html',
                'body',
                // 'p',
                // 'ul', 'ol',
                // 'a', 'b', 'em', 'strong',
                // 'small', 'label', 'span',
                // 'blockquote', 'section', 'article',
                // 'cite', 'code', 'sub', 'sup',
                // 'table', 'tr', 'th', 'td',
                // 'h1','h2','h3', 'h4', 'h5', 'h6',
            ];
            if (cItems['family-text']) {
                val = cItems['family-text'];
            }
            else {
                val = cItems['family'];
            }
        }

        else if (cName == 'font-weight') {
            important = true;
            selectors = [`.${classname} *`];
            tags = [
                'root', 'html',
                'body',
                // 'p',
                // 'ul', 'ol',
                // 'a', 'b', 'em', 'strong',
                // 'small', 'label', 'span',
                // 'blockquote', 'section', 'article',
                // 'cite', 'code', 'sub', 'sup',
                // 'table', 'tr', 'th', 'td',
                // 'h1','h2','h3', 'h4', 'h5', 'h6',
            ];
            val = cItems['weight'];
        }

        else if (cName == 'color') {
            important = true;
            selectors = [ `.${classname} *` ];
            tags = [
                'root', 'html',
                'body',
                // 'p',
                // 'ul', 'ol',
                // 'a', 'b', 'em', 'strong',
                // 'small', 'label', 'span',
                // 'blockquote', 'section', 'article',
                // 'cite', 'code', 'sub', 'sup',
                // 'table', 'tr', 'th', 'td',
                // 'h1','h2','h3', 'h4', 'h5', 'h6',
            ];
            val = cItems['color'];
        }

        else if (cName == 'background-color') {
            selectors = [ `.${classname}:not(href)` ];
            tags = [
                'body',
                'p', 'ol', 'ul'
            ];
            val = cItems['color'];

            if (cItems['includeDivs']) {
                tags.push('div');
            }
            if (cItems['includeTables']) {
                tags = tags.concat(['table', 'tr', 'th', 'td']);
            }
        }

        // else if (cName == 'contrast' || cName == 'invert') {
        //     important = true;
        //     selectors = [`.${classname}`];
        //     tags = ['p', 'ol', 'ul'];
        //     if (input['children']['contrast'] && input['children']['contrast']['active']) {
        //         val += `contrast(${input['children']['contrast']['contrast']}%) `;
        //         active = true;
        //     }
        //     if (input['children']['invert'] && input['children']['invert']['active']) {
        //         val += `invert(${input['children']['invert']['invert']}%) `;
        //         active = true;
        //     }
        // }

        if (active && !input['disabled']) {
            rdbd_removeClassFromTags(all_tags, classname);
            rdbd_addClassToTags(tags, classname);
            rdbd_insertFontStyle(cName, val, selectors, important);
        }
        else {
            rdbd_removeClassFromTags(all_tags, classname);
            rdbd_removeFontStyle(cName);
        }
    }
}


rdbd_updateFont(rdbdInput_font);
