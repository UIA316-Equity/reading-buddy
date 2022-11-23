function updateTheme() {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];
        let root = document.documentElement;
        root.style.setProperty('--awake-primary', data['theme']['primary-color']);
        root.style.setProperty('--awake-secondary', data['theme']['secondary-color']);
    });
    chrome.runtime.sendMessage({'updateApp': 'updateIcon'});
}

function checkAppActiveStatus(data) {
    let oldActive = data['active'];
    let newActive = false;
    for (let [pTool, pItems] of Object.entries(data['tools'])) {
        if (pItems['active']) {
            newActive = true;
            break;
        }
    }
    if (newActive != oldActive) {
        chrome.runtime.sendMessage({'updateApp': 'updateIcon'});
    }
    return newActive;
}

function expandOrCollapseContainer(pName, cName=null, sName=null) {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];

        let container;
        let collapsed;

        if (cName) {
            container = document.getElementById(data['tools'][pName]['children'][cName]['container']);
            collapsed = !data['tools'][pName]['children'][cName]['collapsed'];
            data['tools'][pName]['children'][cName]['collapsed'] = collapsed;
        }
        else if (sName) {
            container = document.getElementById(data['tools'][pName]['sections'][sName]['container']);
            collapsed = !data['tools'][pName]['sections'][sName]['collapsed'];
            data['tools'][pName]['sections'][sName]['collapsed'] = collapsed;
        }
        else {
            container = document.getElementById(data['tools'][pName]['container']);
            collapsed = !data['tools'][pName]['collapsed'];
            data['tools'][pName]['collapsed'] = collapsed;
        }

        if (collapsed) {
            container.classList.add('collapsed');
        }
        else {
            container.classList.remove('collapsed');
        }

        chrome.storage.local.set({'readingbuddiesData': data});
    });
}

function appToggle(event) {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];
        let toggle = event.target;
        let mainContainer = document.getElementById(data["container"]);

        if (data['disabled']) {
            toggle.value = 'Disable';
            mainContainer.classList.remove('inactive');
            data['disabled'] = false;
            data['active'] = checkAppActiveStatus(data);
        }
        else {
            toggle.value = 'Enable';
            mainContainer.classList.add('inactive');
            data['disabled'] = true;
            data['active'] = false;
            chrome.runtime.sendMessage({'updateApp': 'updateIcon'});
        }

        chrome.storage.local.set({'readingbuddiesData': data});

        for (let tName in data['tools']) {
            chrome.runtime.sendMessage({'updateTool': tName});
        }
    });
}

function toolToggle(event, pName, cName=null) {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];

        let toggle = event.target;
        let pOnoff = document.getElementById(data['tools'][pName]['onoff']);

        let pContainer = document.getElementById(data['tools'][pName]['container']);
        let cContainer = cName ? document.getElementById(data['tools'][pName]['children'][cName]['container']) : null;
        let thisContainer = cName ? cContainer : pContainer;

        let active;
        let pActive;

        if (cName) {
            active = !data['tools'][pName]['children'][cName]['active'];
            data['tools'][pName]['children'][cName]['active'] = active;

            if (active) {
                toggle.value = 'Disable';
                thisContainer.classList.remove('inactive');
            }
            else {
                toggle.value = 'Enable';
                thisContainer.classList.add('inactive');
            }

            pActive = false;
            for (let child of Object.values(data['tools'][pName]['children'])) {
                pActive = pActive || child['active'];
            }
            data['tools'][pName]['active'] = pActive;

            if (pActive) {
                pOnoff.textContent = 'ON';
                pContainer.classList.remove('inactive');
            }
            else {
                pOnoff.textContent = 'OFF';
                pContainer.classList.add('inactive');
            }
        }

        else {
            active = !data['tools'][pName]['active'];
            data['tools'][pName]['active'] = active;

            if (active) {
                pOnoff.textContent = 'ON';
                toggle.value = 'Disable';
                thisContainer.classList.remove('inactive');
            }
            else {
                pOnoff.textContent = 'OFF';
                toggle.value = 'Enable';
                thisContainer.classList.add('inactive');
            }

            if (data['tools'][pName]['sections']) {
                for (let [section, vals] of Object.entries(data['tools'][pName]['sections'])) {
                    data['tools'][pName]['sections'][section]['active'] = active;
                    if (active) {
                        document.getElementById(vals['container']).classList.remove('inactive');
                    }
                    else {
                        document.getElementById(vals['container']).classList.add('inactive');
                    }
                }
            }
        }

        data['active'] = checkAppActiveStatus(data);

        chrome.storage.local.set({'readingbuddiesData': data});
        chrome.runtime.sendMessage({'updateTool': pName});
    });
}

function updateDataSiblings(event, pName, field, sibIds, cName=null) {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];

        for (let nodeId of sibIds) {
            let node = document.getElementById(nodeId);
            let value;
            let tagType = node.tagName.toLowerCase();

            if (tagType == 'input') {
                let inputType = node.getAttribute('type').toLowerCase();

                if (inputType == 'checkbox') {
                    value = node.checked;
                }
                else {
                    value = event.target.value;
                    node.value = value;
                }
            }

            else if (tagType == 'select') {
                value = event.target.value;
                let optionNode = document.querySelector(`option[value="${value}"]`);
                if (optionNode) {
                    optionNode.selected = true;
                }
            }

            /// Update data
            if (cName != null) {
                data['tools'][pName]['children'][cName]['data'][field] = value;
            }
            else {
                data['tools'][pName]['data'][field] = value;
            }
        }

        /// Update storage, send message to update tool
        chrome.storage.local.set({'readingbuddiesData': data});
        chrome.runtime.sendMessage({'updateTool': pName});
    });
}

function rivalEvent(field_a, nodeIDs_a, field_b, nodeIDs_b, pName, cName=null) {
    for (let a of nodeIDs_a) {
        document.getElementById(a).classList.remove('inactive');
    }
    for (let b of nodeIDs_b) {
        document.getElementById(b).classList.add('inactive');
    }

    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];
        if (cName) {
            data['tools'][pName]['children'][cName]['rivals'] = [
                [field_a, nodeIDs_a],
                [field_b, nodeIDs_b]
            ];
        }
        else {
            data['tools'][pName]['rivals'] = [
                [field_a, nodeIDs_a],
                [field_b, nodeIDs_b]
            ];
        }
        chrome.storage.local.set({'readingbuddiesData': data});
        chrome.runtime.sendMessage({'updateTool': pName});
    });
}

function addRivalEventListeners(rivals, pName, cName=null) {
    let field_a = rivals[0][0];
    let nodeIDs_a = rivals[0][1];
    let field_b = rivals[1][0];
    let nodeIDs_b = rivals[1][1];

    for (let this_a of nodeIDs_a) {
        document.getElementById(this_a).addEventListener('click', function(event) {
            return rivalEvent(field_a, nodeIDs_a, field_b, nodeIDs_b, pName, cName);
        });
    }

    for (let this_b of nodeIDs_b) {
        document.getElementById(this_b).addEventListener('click', function(event) {
            return rivalEvent(field_b, nodeIDs_b, field_a, nodeIDs_a, pName, cName);
        });
    }
}

function addToolsEventListeners(items, pName, cName=null) {
    /// Clicking container header --> expand/collapse container
    let headerID = items['header'] ?? null;
    if (headerID) {
        document.getElementById(headerID).addEventListener('click', function(event) {
            return expandOrCollapseContainer(pName, cName);
        });
    }

    /// Clicking toggle -> turn tool on/off
    let toggleID = items['toggle'] ?? null;
    if (toggleID) {
        document.getElementById(toggleID).addEventListener('click', function(event) {
            return toolToggle(event, pName, cName);
        });
    }

    /// Sections
    if (items['sections']) {
        for (let [section, vals] of Object.entries(items['sections'])) {
            if (vals['header']) {
                document.getElementById(vals['header']).addEventListener('click', function(event) {
                    return expandOrCollapseContainer(pName, cName, section);
                });
            }
        }
    }

    /// Rival items
    let rivals = items['rivals'] ?? null;
    if (rivals) {
        addRivalEventListeners(rivals, pName, cName);
    }

    /// For each data input...
    if (items['data']) {
        for (let [field, value] of Object.entries(items['data'])) {
            let sibIds = items['inputs'][field];

            for (let i of sibIds) {
                let node = document.getElementById(i);
                let eventType;
                let tagType = node.tagName.toLowerCase();

                if (tagType == 'input') {
                    let inputType = node.getAttribute('type');
                    if (inputType == 'checkbox') {
                        eventType = 'click';
                    }
                    else {
                        eventType = 'input';
                    }
                }
                else if (tagType == 'select') {
                    eventType = 'change';
                }

                node.addEventListener(eventType, function(event) {
                    return updateDataSiblings(event, pName, field, sibIds, cName);
                });
            }
        }
    }
}

function addPopupEventListeners() {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        let data = result['readingbuddiesData'];

        /// App toggle
        document.getElementById("app-toggle").addEventListener("click", function(event) {
            return appToggle(event);
        });

        /// For each parent tool
        for (let [pName, pItems] of Object.entries(data['tools'])) {
            addToolsEventListeners(pItems, pName);

            /// Check children...
            if (pItems['children']) {
                for (let [cName, cItems] of Object.entries(pItems['children'])) {
                    addToolsEventListeners(cItems, pName, cName);
                }
            }
        }
    });
}

function updatePopupTool(items) {
    /// Container collapsed or expanded
    if (items['collapsed']) {
        document.getElementById(items['container']).classList.add('collapsed');
    }
    else {
        document.getElementById(items['container']).classList.remove('collapsed');
    }

    /// Tool active /inactive
    if (items['active']) {
        document.getElementById(items['container']).classList.remove('inactive');
        let onoffID = items['onoff'];
        if (onoffID) {
            document.getElementById(onoffID).textContent = 'ON';
        }
        let toggleID = items['toggle'];
        if (toggleID) {
            document.getElementById(toggleID).value = 'Disable';
        }
    }
    else {
        document.getElementById(items['container']).classList.add('inactive');
        let onoffID = items['onoff'];
        if (onoffID) {
            document.getElementById(onoffID).textContent = 'OFF';
        }
        let toggleID = items['toggle'];
        if (toggleID) {
            document.getElementById(toggleID).value = 'Enable';
        }
    }

    /// Rival sets
    let rivals = items["rivals"];
    if (rivals) {
        for (let a of rivals[0][1]) {
            document.getElementById(a).classList.remove('inactive');
        }
        for (let b of rivals[1][1]) {
            document.getElementById(b).classList.add('inactive');
        }
    }

    /// Update sections...
    if (items['sections']) {
        for (let [section, vals] of Object.entries(items['sections'])) {
            /// Active matches parent tool
            if (items['active']) {
                document.getElementById(vals['container']).classList.remove('inactive');
            }
            else {
                document.getElementById(vals['container']).classList.add('inactive');
            }

            /// Collapsed /expanded
            if (vals['collapsed']) {
                document.getElementById(vals['container']).classList.add('collapsed');
            }
            else {
                document.getElementById(vals['container']).classList.remove('collapsed');
            }
        }
    }

    /// Update popup data...
    if (items['data']) {
        for (let [field, value] of Object.entries(items['data'])) {
            let sibIds = items['inputs'][field];
            for (let i of sibIds) {
                let node = document.getElementById(i);
                let tagType = node.tagName.toLowerCase();
                if (tagType == 'input') {
                    let inputType = node.getAttribute('type').toLowerCase();
                    if (inputType == 'checkbox') {
                        node.checked = value;
                    }
                    else {
                        node.value = value;
                    }
                }
                else if (tagType == 'select') {
                    document.querySelector(`option[value="${value}"]`).selected = true;
                }
            }
        }
    }
}

function updatePopup() {
    chrome.storage.local.get(['readingbuddiesData'], function(result) {
        data = result['readingbuddiesData'];

        /// App toggle /app disabled
        if (data['disabled']) {
            document.getElementById("app-toggle").value = "Enable";
            document.getElementById(data["container"]).classList.add("inactive");
        }
        else {
            document.getElementById("app-toggle").value = "Disable";
            document.getElementById(data["container"]).classList.remove("inactive");
        }

        /// For each parent tool
        for (let [pName, pItems] of Object.entries(data['tools'])) {
            updatePopupTool(pItems);

            /// Update children tools...
            if (pItems['children']) {
                for (let [cName, cItems] of Object.entries(pItems['children'])) {
                    updatePopupTool(cItems);
                }
            }

            chrome.runtime.sendMessage({'updateTool': pName});
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    addPopupEventListeners();
    updateTheme();
    updatePopup();
});
