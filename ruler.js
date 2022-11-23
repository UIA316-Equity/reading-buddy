function rdbd_insertRulerStyles() {
    rdbd_removeRulerStyles();

    let stylenode = document.createElement('style');
    stylenode.id = 'readingbuddiesRuler_styles';

    let inlinestyles = `
        :root {
            --rdbd_ruler_height:32px;
            --rdbd_ruler_mouse-y:100px;
            --rdbd_ruler_color:#00ffff;
            --rdbd_ruler_opacity:0.3;
        }
        #readingbuddiesRuler {
            position:fixed;
            z-index:100000;
            left:0;
            right:0;
            pointer-events:none;
            height:var(--rdbd_ruler_height);
            top:var(--rdbd_ruler_mouse-y);
            background-color:var(--rdbd_ruler_color);
            opacity:var(--rdbd_ruler_opacity);
        }`;

    stylenode.appendChild(document.createTextNode(inlinestyles));
    document.getElementsByTagName('head')[0].appendChild(stylenode);
}

function rdbd_removeRulerStyles() {
    let stylenode = document.getElementById('readingbuddiesRuler_styles');
    if (stylenode != null) {
        stylenode.parentNode.removeChild(stylenode);
    }
}

function rdbd_updateRuler(input)
{
    let ruler = document.getElementById('readingbuddiesRuler');

    if (input['active'] && !input['disabled']) {
        rdbd_insertRulerStyles();

        if (ruler == null) {
            ruler = document.createElement('div');
            ruler.id = 'readingbuddiesRuler';
            document.getElementsByTagName('body')[0].appendChild(ruler);
        }

        ruler.style.setProperty('--rdbd_ruler_height', `${input['height']}px`);
        ruler.style.setProperty('--rdbd_ruler_color', input['color']);
        ruler.style.setProperty('--rdbd_ruler_opacity', `${input['opacity']/100}`);

        document.addEventListener('mousemove', function(event) {
            ruler.style.setProperty('--rdbd_ruler_mouse-y', `${event.clientY-(input['height']*0.7)}px`);
        });
    }
    else {
        if (ruler != null) {
            ruler.parentNode.removeChild(ruler);
        }
        rdbd_removeRulerStyles();
    }
}


rdbd_updateRuler(rdbdInput_ruler);
