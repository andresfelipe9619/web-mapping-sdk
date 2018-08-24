import React, { Component } from 'react'

export default class LayerSwitcher extends Component {
    render() {
        return (
            <div id="layertree">
                <ul>
                    <li><span>OSM layer</span>
                        <fieldset id="layer0">
                            <label class="checkbox" for="visible0">
                                <input id="visible0" class="visible" type="checkbox" />visibility
                                </label>
                            <label>opacity</label>
                            <input class="opacity" type="range" min="0" max="1" step="0.01" />
                        </fieldset>
                    </li>
                    <li><span>Layer group</span>
                        <fieldset id="layer1">
                            <label class="checkbox" for="visible1">
                                <input id="visible1" class="visible" type="checkbox" />visibility
                                </label>
                            <label>opacity</label>
                            <input class="opacity" type="range" min="0" max="1" step="0.01" />
                        </fieldset>
                        <ul>
                            <li><span>Food insecurity layer</span>
                                <fieldset id="layer10">
                                    <label class="checkbox" for="visible10">
                                        <input id="visible10" class="visible" type="checkbox" />visibility
                                    </label>
                                    <label>opacity</label>
                                    <input class="opacity" type="range" min="0" max="1" step="0.01" />
                                </fieldset>
                            </li>
                            <li><span>World borders layer</span>
                                <fieldset id="layer11">
                                    <label class="checkbox" for="visible11">
                                        <input id="visible11" class="visible" type="checkbox" />visibility
                                    </label>
                                    <label>opacity</label>
                                    <input class="opacity" type="range" min="0" max="1" step="0.01" />
                                </fieldset>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

