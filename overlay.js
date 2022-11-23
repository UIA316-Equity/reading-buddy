function rdbd_insertOverlayStyles(input) {
    rdbd_removeOverlayStyles();

    let stylenode = document.createElement('style');
    stylenode.id = 'readingbuddiesOverlay_styles';

    let inlinestyles = `
        :root {
            --rdbd_overlay_color:${input['color']};
            --rdbd_overlay_opacity:${input['opacity']}%;
        }
        #readingbuddiesOverlay {
            position:fixed;
            z-index:99999;
            left:0;
            right:0;
            top:0;
            pointer-events:none;
            height:100%;
            background-color:var(--rdbd_overlay_color);
            opacity:var(--rdbd_overlay_opacity);
        }`;

    stylenode.appendChild(document.createTextNode(inlinestyles));
    document.getElementsByTagName('head')[0].appendChild(stylenode);
}

function rdbd_removeOverlayStyles() {
    let stylenode = document.getElementById('readingbuddiesOverlay_styles');
    if (stylenode != null) {
        stylenode.parentNode.removeChild(stylenode);
    }
}

function rdbd_updateOverlay(input)
{
    let overlay = document.getElementById('readingbuddiesOverlay');

    if (input['active'] && !input['disabled']) {
        rdbd_insertOverlayStyles(input);

        if (overlay == null) {
            overlay = document.createElement('div');
            overlay.id = 'readingbuddiesOverlay';
            document.getElementsByTagName('body')[0].appendChild(overlay);
        }

    }
    else {
        if (overlay != null) {
            overlay.parentNode.removeChild(overlay);
        }
        rdbd_removeOverlayStyles();
    }
}


rdbd_updateOverlay(rdbdInput_overlay);
