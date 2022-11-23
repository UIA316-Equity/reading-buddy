rdbd_startData = {
    "active": false,
    "disabled": false,
    "theme": {
        "name": "teal",
        "primary-color": "var(--theme_teal)",
        "secondary-color": "var(--theme_teal_secondary)"
    },
    "container": "all-tools-container",
    "tools": {
        "lineheight": {
            "active": false,
            "collapsed": true,
            "container": "lineheight-container",
            "header": "lineheight-header",
            "onoff": "lineheight-on-off",
            "toggle": "lineheight-toggle",
            // "rivals": [
            //     ["height", ["lineheight-input-container_1", "lineheight-input-container_2"]],
            //     ["factor", ["lineheight-factor-input-container_1", "lineheight-factor-input-container_2"]]
            // ],
            "data": {
                "height": 2.0,
                // "factor": 150,
                "includeLists": false
            },
            "inputs": {
                "height": ["lineheight-slider", "lineheight-num"],
                // "factor": ["lineheight-factor-slider", "lineheight-factor-num"],
                "includeLists": ["lineheight-lists"]
            }
        },
        "spacing": {
            "active": false,
            "collapsed": true,
            "container": "spacing-container",
            "header": "spacing-header",
            "onoff": "spacing-on-off",
            "children": {
                "word-spacing": {
                    "active": false,
                    "collapsed": false,
                    "container": "wordsp-container",
                    "header": "wordsp-header",
                    "toggle": "wordsp-toggle",
                    "data": {
                        "spacing": 0.5
                    },
                    "inputs": {
                        "spacing": ["wordsp-slider", "wordsp-num"]
                    }
                },
                "letter-spacing": {
                    "active": false,
                    "collapsed": false,
                    "container": "lettersp-container",
                    "header": "lettersp-header",
                    "toggle": "lettersp-toggle",
                    "data": {
                        "spacing": 0.1
                    },
                    "inputs": {
                        "spacing": ["lettersp-slider", "lettersp-num"]
                    }
                }
            }
        },
        "font": {
            "active": false,
            "collapsed": true,
            "container": "font-container",
            "header": "font-header",
            "onoff": "font-on-off",
            "children": {
                "font-family": {
                    "active": false,
                    "collapsed": false,
                    "container": "fontfam-container",
                    "header": "fontfam-header",
                    "toggle": "fontfam-toggle",
                    "data": {
                        "family": "Arial, Helvetica, sans-serif",
                        "family-text": null
                    },
                    "inputs": {
                        "family": ["fontfam-select"],
                        "family-text": ["fontfam-text"]
                    }
                },
                "font-size": {
                    "active": false,
                    "collapsed": false,
                    "container": "fontsize-container",
                    "header": "fontsize-header",
                    "toggle": "fontsize-toggle",
                    // "rivals": [
                    //     ["size",   ["fontsize-input-container_1", "fontsize-input-container_2"]],
                    //     ["factor", ["fontsize-factor-input-container_1", "fontsize-factor-input-container_2"]]
                    // ],
                    "data": {
                        "size": 12,
                        // "factor": 100
                    },
                    "inputs": {
                        "size": ["fontsize-slider", "fontsize-num"],
                        // "factor": ["fontsize-factor-slider", "fontsize-factor-num"]
                    }
                },
                "font-weight": {
                    "active": false,
                    "collapsed": false,
                    "container": "fontweight-container",
                    "header": "fontweight-header",
                    "toggle": "fontweight-toggle",
                    "data": {
                        "weight": "700"
                    },
                    "inputs": {
                        "weight": ["fontweight-slider", "fontweight-num"]
                    }
                },
                "color": {
                    "active": false,
                    "collapsed": false,
                    "container": "fontcolor-container",
                    "header": "fontcolor-header",
                    "toggle": "fontcolor-toggle",
                    "data": {
                        "color": "#000000"
                    },
                    "inputs": {
                        "color": ["fontcolor-color"]
                    }
                },
                "background-color": {
                    "active": false,
                    "collapsed": false,
                    "container": "backgroundcolor-container",
                    "header": "backgroundcolor-header",
                    "toggle": "backgroundcolor-toggle",
                    "data": {
                        "color": "#ffffff",
                        "includeDivs": false,
                        "includeTables": false,
                    },
                    "inputs": {
                        "color": ["backgroundcolor-color"],
                        "includeDivs": ["backgroundcolor-divs"],
                        "includeTables": ["backgroundcolor-tables"]
                    }
                },
                // "contrast": {
                //     "active": false,
                //     "collapsed": false,
                //     "container": "contrast-container",
                //     "header": "contrast-header",
                //     "toggle": "contrast-toggle",
                //     "data": {
                //         "contrast": 300
                //     },
                //     "inputs": {
                //         "contrast": ["contrast-slider", "contrast-num"],
                //     }
                // },
                // "invert": {
                //     "active": false,
                //     "collapsed": false,
                //     "container": "invert-container",
                //     "header": "invert-header",
                //     "toggle": "invert-toggle",
                //     "data": {
                //         "invert": 100
                //     },
                //     "inputs": {
                //         "invert": ["invert-slider", "invert-num"]
                //     }
                // }
            }
        },
        "ruler": {
            "active": false,
            "collapsed": true,
            "container": "ruler-container",
            "header": "ruler-header",
            "onoff": "ruler-on-off",
            "toggle": "ruler-toggle",
            "data": {
                "height": 32,
                "color": "#00ffff",
                "opacity": 30
            },
            "inputs": {
                "height": ["ruler-height-slider", "ruler-height-num"],
                "color": ["ruler-color"],
                "opacity": ["ruler-opacity-slider", "ruler-opacity-num"]
            },
            "sections": {
                "height": {
                    "collapsed": false,
                    "container": "ruler-height-container",
                    "header": "ruler-height-header",
                },
                "color": {
                    "collapsed": false,
                    "container": "ruler-color-container",
                    "header": "ruler-color-header",
                },
                "opacity": {
                    "collapsed": false,
                    "container": "ruler-opacity-container",
                    "header": "ruler-opacity-header",
                }
            }
        },
        "overlay": {
            "active": false,
            "collapsed": true,
            "container": "overlay-container",
            "header": "overlay-header",
            "onoff": "overlay-on-off",
            "toggle": "overlay-toggle",
            "data": {
                "color": "#ffcc00",
                "opacity": 10
            },
            "inputs": {
                "color": ["overlay-color"],
                "opacity": ["overlay-opacity-slider", "overlay-opacity-num"]
            },
            "sections": {
                "color": {
                    "collapsed": false,
                    "container": "overlay-color-container",
                    "header": "overlay-color-header",
                },
                "opacity": {
                    "collapsed": false,
                    "container": "overlay-opacity-container",
                    "header": "overlay-opacity-header",
                }
            }
        }
    }
}


function createDataForScript(data, tName) {
    let tdata = {"disabled": data["disabled"],
                 "active":   data["tools"][tName]["active"] };

    if (data["tools"][tName]["rivals"]) {
        tdata["rivals"] = [ data["tools"][tName]["rivals"][0][0], data["tools"][tName]["rivals"][1][0] ];
    }

    if (data["tools"][tName]["data"]) {
        for (let [field, value] of Object.entries(data["tools"][tName]["data"])) {
            tdata[field] = value;
        }
    }

    if (data["tools"][tName]["children"]) {
        tdata["children"] = { };
        for (let [cName, cItems] of Object.entries(data["tools"][tName]["children"])) {
            tdata["children"][cName] = {"active": cItems["active"]};
            if (cItems["rivals"]) {
                tdata["children"][cName]["rivals"] = [ cItems["rivals"][0][0], cItems["rivals"][1][0] ];
            }
            if (cItems["data"]) {
                for (let [field, value] of Object.entries(cItems["data"])) {
                    tdata["children"][cName][field] = value;
                }
            }
        }
    }

    return tdata;
}

function toggleIcon(data) {
    let iconPath = "icons/icon32";
    if (data['active']) {
        iconPath += `active_${data['theme']['name']}`;
    }
    iconPath += '.png';
    chrome.browserAction.setIcon({
        path: iconPath
    });
}

function execToolScript(data, tName, scriptfile) {
    let tdata = createDataForScript(data, tName);

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        let varname = `rdbdInput_${tName}`;
        for (let i in tabs) {
            chrome.tabs.executeScript(tabs[i].id, {
                code:   `var ${varname} = ${JSON.stringify(tdata)};`
            }, _=>chrome.runtime.lastError);

            chrome.tabs.executeScript(tabs[i].id, {
                file: scriptfile
            }, _=>chrome.runtime.lastError);
        }
    });
}

function updateAllTools(data) {
    for (let [tName, items] of Object.entries(data["tools"])) {
        execToolScript(data, tName, `${tName}.js`);
    }
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({"readingbuddiesData": rdbd_startData},
        chrome.storage.local.get(["readingbuddiesData"], function(result) {
            let data = result["readingbuddiesData"];
            toggleIcon(data);
            updateAllTools(data);
        })
    );
});

// chrome.tabs.onActivated.addListener(function(info) {
//     chrome.storage.local.get(["readingbuddiesData"], function(result) {
//         let data = result["readingbuddiesData"];
//         updateAllTools(data);
//         toggleIcon(data);
//     });
// });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        chrome.storage.local.get(["readingbuddiesData"], function(result) {
            let data = result["readingbuddiesData"];
            toggleIcon(data);
            updateAllTools(data);
        });
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request["updateApp"]) {
        if (request["updateApp"] == "updateIcon") {
            chrome.storage.local.get(["readingbuddiesData"], function(result) {
                let data = result["readingbuddiesData"];
                toggleIcon(data);
            });
        }
    }

    if (request["updateTool"]) {
        chrome.storage.local.get(["readingbuddiesData"], function(result) {
            let tName = request["updateTool"];
            let data = result["readingbuddiesData"];
            execToolScript(data, tName, `${tName}.js`);
        });
    }
});
