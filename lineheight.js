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

function rdbd_insertLineheightStyle(val, selector, important=false) {
    rdbd_removeLineheightStyle();

    let toolName = 'Lineheight';
    let property = 'line-height';
    let cssVar = '--rdbd_lineheight';

    let stylenode = document.createElement('style');
    stylenode.id = `readingbuddies${toolName}_style`;
    let inlinestyles =
        `:root{
            ${cssVar}:${val};
        }
        ${selector}:not(#readingbuddiesRuler):not(#readingbuddiesOverlay) {
            ${property}:var(${cssVar}) ${important ? '!important' : ''};
        }`;
        // .readingbuddies${toolName}_styled  a:link,
        // .readingbuddies${toolName}_styled  a:visited
    stylenode.appendChild(document.createTextNode(inlinestyles));
    document.getElementsByTagName('head')[0].appendChild(stylenode);
}

function rdbd_removeLineheightStyle() {
    let stylenode = document.getElementById('readingbuddiesLineheight_style');
    if (stylenode != null) {
        stylenode.parentNode.removeChild(stylenode);
    }
}

function rdbd_updateLineheight(input) {
    let all_tags = ['p', 'ul', 'ol'];
    let tags = ['p'];
    let important = true;
    let classname = 'readingbuddiesLineheight_styled';
    let selector = `.${classname}`;
    let val = '';

    if (input['rivals'] && input['rivals'][0] == 'factor') {
        val = `${input['factor']}%`;
    }
    else {
        val = input['height'];
    }

    if (input['active'] && !input['disabled']) {
        rdbd_removeClassFromTags(all_tags, classname);
        if (input['includeLists']) {
            tags = all_tags;
        }
        rdbd_addClassToTags(tags, classname);
        rdbd_insertLineheightStyle(val, selector, important);
    }
    else {
        rdbd_removeClassFromTags(all_tags, classname);
        rdbd_removeLineheightStyle();
    }
}

function rdbd_insertLineheightInline(input) { /// uses computed val directly, but harder to revert
    let tags = ['p', 'ol', 'ul'];
    let useFactor = input['rivals'][0] == 'factor';

    for (let t of tags) {
        let nodes = document.getElementsByTagName(t);
        for (let node of nodes) {
            node.style.removeProperty('line-height'); /// remove

            if (input['active'] && !input['disabled']) {  /// insert
                if ((t == 'ol' || t == 'ul' || t == 'li') && !input['includeLists']) {
                    ;
                }
                else {
                    if (useFactor) {
                        let original = parseFloat(getComputedStyle(node).lineHeight);
                        let adjusted = original * (input['factor'] / 100);
                        let adjusted_str = `${adjusted}px`;
                        node.style.lineHeight = adjusted_str;
                    }
                    else {
                        node.style.lineHeight = input['height'];
                    }
                }
            }
        }
    }
};


rdbd_updateLineheight(rdbdInput_lineheight);

// rdbd_insertLineheightInline(rdbdInput_lineheight);
