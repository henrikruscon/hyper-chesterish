// Require
const { shell } = require('electron');
const { exec } = require('child_process');
const throttle = require('lodash.throttle');

// Syntax scheme
const backgroundColor = '#293341';
const foregroundColor = '#CDD2E9';
const cursorColor = '#2C85F7';
const borderColor = backgroundColor;
const colors = {
    black           : backgroundColor,
    orange          : '#FFB68E',
    red             : '#E17E85',
    green           : '#61BA86',
    yellow          : '#FFEC8E',
    blue            : '#4CB2FF',
    magenta         : '#BE86E3',
    cyan            : '#2DCED0',
    white           : foregroundColor,
    lightBlack      : '#546386',
    lightRed        : '#E17E85',
    lightGreen      : '#61BA86',
    lightYellow     : '#FFEC8E',
    lightBlue       : '#4CB2FF',
    lightMagenta    : '#BE86E3',
    lightCyan       : '#2DCED0',
    lightWhite      : foregroundColor
};

// Config
exports.decorateConfig = config => {
    return Object.assign({}, config, {
        foregroundColor,
        backgroundColor,
        borderColor,
        cursorColor,
        colors,
        cursorShape: 'BEAM',
        termCSS: `
            ${config.termCSS || ''}
            ::selection {
                background: #9198A2 !important;
            }
            .cursor-node {
                background-color: transparent !important;
            }
            .cursor-node[focus=false] {
                width: 3px !important;
            }
            .cursor-node[focus=true]:not([moving]) {
                animation: blink 1s ease infinite;
            }
            @keyframes blink {
                50% {
                    opacity: 0;
                }
            }
            span {
                font-weight: normal !important;
            }
        `,
        css: `
            ${config.css || ''}
            ::selection {
                background: #9198A2 !important;
            }
            .notifications_view {
                display: none !important;
            }
            .header_header {
                top: 0;
                right: 0;
                left: 0;
            }
            .tabs_borderShim {
                display: none;
            }
            .tabs_list {
                margin-left: 0;
                border-bottom: 1px solid #354253;
            }
            .tab_first {
                border-left-width: 0px !important;
                padding-left: 1px;
            }
            .tab_tab {
                color: #626978;
                border-right-width: 1px;
                border-right-style: solid;
                border-color: transparent !important;
                background-color: #232C37;
                transition: background 150ms ease;
            }
            .tab_tab:last-child, .tab_tab.tab_active:last-child {
                border-right-width: 0 !important;
                padding-right: 1px;
            }
            .tab_tab:hover {
                color: #FFFFFF;
                background-color: #354253;
            }
            .tab_tab.tab_active {
                color: #FFFFFF;
                border-color: #354253 !important;
                background-color: transparent;
            }
            .tab_tab.tab_active::before {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: -1px;
                border-bottom: 1px solid ${backgroundColor};
            }
            .tab_icon {
                top: 9px;
                left: 9px;
                width: 16px;
                height: 16px;
                border-radius: 2px;
                transform: scale(0);
                transition: transform 150ms ease, background 150ms ease;
            }
            .tab_icon:hover {
                background-color: #232C37;
            }
            .tab_tab:hover .tab_icon {
                transform: scale(1);
            }
            .tab_tab.tab_active .tab_icon:hover {
                background-color: #3B495C;
            }
            .tab_icon::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                -webkit-mask-image: url('${__dirname}/icons/close.svg');
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-size: 9px;
                -webkit-mask-position: center;
                transition: background 150ms ease;
            }
            .tab_shape {
                display: none;
            }
            .tab_tab.tab_hasActivity .tab_text {
                color: ${colors.orange};
                animation: pulse 3s ease-in-out infinite;
            }
            .tab_tab.tab_hasActivity:hover .tab_text {
                animation: none;
            }
            @keyframes pulse {
                0% {
                    opacity: 1;
                }
                50% {
                    opacity: 1;
                }
                75% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 1;
                }
            }
            .tab_tab.tab_hasActivity .tab_icon::before {
                background-color: ${colors.orange};
            }
            .tab_tab.tab_hasActivity .tab_icon:hover {
                background-color: ${colors.orange};
            }
            .tab_tab.tab_hasActivity .tab_icon:hover::before {
                background-color: #FFFFFF;
            }
            .tab_textInner {
                padding: 0 30px;
            }
            .tab_service {
                max-width: 100%;
                position: relative;
                display: inline-block;
                white-space: nowrap;
                padding: 0 6px 0 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: background-image 150ms ease;
            }
            .tab_service::before {
                content: '';
                position: absolute;
                left: 0;
                width: 14px;
                height: 100%;
                background-color: #626978;
                -webkit-mask-repeat: no-repeat;
                -webkit-mask-position: left center;
                transition: background 150ms ease;
            }
            .tab_service.tab_shell::before {
                left: 5px;
                -webkit-mask-image: url('${__dirname}/icons/shell.svg');
                -webkit-mask-size: 8px 14px;
            }
            .tab_service.tab_gulp::before {
                left: 6px;
                -webkit-mask-image: url('${__dirname}/icons/gulp.svg');
                -webkit-mask-size: 6px 14px;
            }
            .tab_service.tab_php::before {
                -webkit-mask-image: url('${__dirname}/icons/php.svg');
                -webkit-mask-size: 14px 10px;
            }
            .tab_service.tab_node::before {
                -webkit-mask-image: url('${__dirname}/icons/node.svg');
                -webkit-mask-size: 14px 14px;
            }
            .tab_service.tab_vim::before {
                left: 2px;
                -webkit-mask-image: url('${__dirname}/icons/vim.svg');
                -webkit-mask-size: 12px 11px;
            }
            .tabs_title .tab_service::before, .tab_tab.tab_active .tab_service::before, .tab_tab:hover .tab_service::before {
                background-color: #FFFFFF;
            }
            .tab_tab.tab_hasActivity .tab_service::before {
                background-color: ${colors.orange};
            }
        `
    });
};

// Hide traffic buttons
exports.decorateBrowserOptions = defaults => Object.assign({}, defaults, {
    titleBarStyle: '',
    transparent: true,
    frame: false
})

// Current shell service
const getService = (title) => {
    const service = (title.split(' ')[1] === 'gulp' || title.split(' ')[1] === 'php' || title.split(' ')[1] === 'node' || title.split(' ')[1] === 'vim') ? title.split(' ')[1] : 'shell';
    return service;
};

// Tab icons
exports.decorateTab = (Tab, { React }) => {
    return class extends Tab {
        render() {
            const icon = getService(this.props.text);
            this.props.text = React.createElement('span', { className: `tab_service tab_${icon}` }, this.props.text);
            return React.createElement(Tab, Object.assign({}, this.props, {}));
        };
    };
};
exports.decorateTabs = (Tabs, { React }) => {
    return class extends Tabs {
        render() {
            if (this.props.tabs.length === 1 && typeof this.props.tabs[0].title === 'string') {
                const icon = getService(this.props.tabs[0].title);
                this.props.tabs[0].title = React.createElement('span', { className: `tab_service tab_${icon}` }, this.props.tabs[0].title);
            }
            return React.createElement(Tabs, Object.assign({}, this.props, {}));
        };
    };
};

const busy_timeout = 700;
const busy_throttle = busy_timeout / 2;

// Moving state on cursor
exports.decorateTerm = (Term, { React }) => {
    return class extends React.Component {
        constructor (props) {
            super(props);
            this._onTerminal = this._onTerminal.bind(this);
            this._onCursorChange = this._onCursorChange.bind(this);
            this._updateCursorStatus = this._updateCursorStatus.bind(this);
            this._markBusyThrottled = throttle(this._markBusy.bind(this), busy_throttle);
            this._markIdle = this._markIdle.bind(this);
        }

        _onTerminal (term) {
            if (this.props.onTerminal) this.props.onTerminal(term);

            this._cursor = term.cursorNode_;

            this._observer = new MutationObserver(this._onCursorChange);
            this._observer.observe(this._cursor, {
                attributes: true,
                childList: false,
                characterData: false
            });
        };

        _onCursorChange (mutations) {
            const cursorMoved = mutations.some(m => m.attributeName === 'title');
            if (cursorMoved) {
                this._updateCursorStatus();
            }
        };

        _updateCursorStatus () {
            this._markBusyThrottled();

            clearTimeout(this._markingTimer);
            this._markingTimer = setTimeout(() => {
                this._markIdle()
            }, busy_timeout);
        };

        _markBusy () {
            this._cursor.setAttribute('moving', true)
        };

        _markIdle () {
            this._cursor.removeAttribute('moving')
        };

        render () {
            return React.createElement(Term, Object.assign({}, this.props, {
                onTerminal: this._onTerminal
            }));
        };

        componentWillUnmount () {
            if (this._observer) {
                this._observer.disconnect()
            }
        };
    };
};
