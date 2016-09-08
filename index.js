// Require
const { shell } = require('electron');
const { exec } = require('child_process');
const throttle = require('lodash.throttle');

// Syntax scheme
const backgroundColor = '#293341';
const foregroundColor = '#CDD2E9';
const cursorColor = '#2C85F7';
const borderColor = backgroundColor;
const fontSize = 12;
const colors = {
    black           : backgroundColor,
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
        fontSize,
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
            .tabs_list {
                background-color: #232C37;
                border-bottom-color: #354253 !important;
            }
            .tab_first {
                margin-left: -1px;
                border: 0 !important;
            }
            .tab_tab {
                color: #626978;
                transition: background 150ms ease;
            }
            .tab_tab:hover {
                color: #FFFFFF;
                background-color: #354253;
            }
            .tab_tab.tab_active {
                color: #FFFFFF;
                font-weight: 400;
                background-color: ${backgroundColor};
                border-color: #354253 !important;
            }
            .tab_tab.tab_active::before {
                border-bottom-color: ${backgroundColor};
            }
            .tab_tab.tab_hasActivity {
                color: #FFB68E;
                animation: pulse 3s ease-in-out infinite;
            }
            .tab_tab.tab_hasActivity:hover {
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
            .tab_tab.tab_hasActivity .tab_icon::before {
                background-color: #FFB68E;
            }
            .tab_tab.tab_hasActivity .tab_icon:hover {
                background-color: #FFB68E;
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
                background-color: #FFB68E;
            }
            .terms_terms {
                padding: 12px 14px 42px !important;
            }
            .footer_footer {
                display: flex;
                justify-content: space-between;
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 100;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
                font-size: ${fontSize}px;
                height: 30px;
                padding: 0 14px 1px;
                background-color: #2F3B4A;
                opacity: 0.45;
                cursor: default;
                -webkit-user-select: none;
                transition: opacity 250ms ease;
            }
            .footer_footer:hover {
                opacity: 1;
            }
            .item_item {
                display: flex;
                align-items: center;
                color: #969DAA;
                background-repeat: no-repeat;
                background-position: left center;
                white-space: nowrap;
                overflow: hidden;
                opacity: 0;
                pointer-events: none;
            }
            .item_active {
                opacity: 1;
                pointer-events: auto;
            }
            .item_folder {
                padding-left: 21px;
                background-image: url('${__dirname}/icons/folder.svg');
                background-size: 14px 12px;
                cursor: pointer;
            }
            .item_folder:hover {
                text-decoration: underline;
            }
            .item_branch {
                padding-left: 30px;
                background-image: url('${__dirname}/icons/branch.svg');
                background-size: 9px 12px;
                background-position: 14px center;
            }
        `
    });
};

// Hide traffic buttons
exports.decorateBrowserOptions = defaults => {
    const clean = Object.assign({ frame: false }, defaults);
    delete clean.titleBarStyle;
    return clean;
};

// Current shell service
const getService = (title) => {
    const service = (title.split(' ')[0] === 'gulp' || title.split(' ')[0] === 'php' || title.split(' ')[0] === 'node' || title.split(' ')[0] === 'vim') ? title : 'shell';
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

let curPid;
let curCwd;
let curBranch;
let uids = {};

// Current shell cwd
const setCwd = (pid) =>
    exec(`lsof -p ${pid} | grep cwd | tr -s ' ' | cut -d ' ' -f9-`, (err, cwd) => {
        cwd = cwd.trim();
        curCwd = cwd;

        store.dispatch({
            type: 'SESSION_SET_CWD',
            cwd
        });
});

// Current git branch
const setBranch = (actionCwd) => {
    exec(`git rev-parse --abbrev-ref HEAD`, { cwd: actionCwd }, (err, branch) => {
        curBranch = branch;
    })
};

// Status line
exports.decorateHyperTerm = (HyperTerm, { React }) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                folder: curCwd,
                branch: curBranch
            };
            this.handleClick = this.handleClick.bind(this);
        };
        handleClick() {
            shell.openExternal('file://'+this.state.folder);
        };
        render() {
            const hasBranch = this.state.branch !== '' ? ' item_active' : '';

            return (
                React.createElement(HyperTerm, Object.assign({}, this.props, {
                    customChildren: React.createElement('footer', { className: 'footer_footer' },
                        React.createElement('div', { className: 'item_item item_folder item_active', onClick: this.handleClick }, this.state.folder),
                        React.createElement('div', { className: `item_item item_branch ${hasBranch}` },  this.state.branch)
                    )
                }))
            );
        };
        componentDidMount() {
            setInterval(() => this.setState({
                folder: curCwd,
                branch: curBranch
            }), 100);
        };
    };
};

// Sessions
exports.middleware = (store) => (next) => (action) => {
    switch (action.type) {
        case 'SESSION_PTY_DATA':
            if (curPid && uids[action.uid] === curPid) setCwd(curPid);
            break;
        case 'SESSION_ADD':
            uids[action.uid] = action.pid;
            curPid = action.pid;
            setCwd(curPid);
            break;
        case 'SESSION_SET_CWD':
            setBranch(curCwd);
            break;
        case 'SESSION_SET_ACTIVE':
            curPid = uids[action.uid];
            setCwd(curPid);
            break;
        case 'SESSION_PTY_EXIT':
            delete uids[action.uid];
            break;
        case 'SESSION_USER_EXIT':
            delete uids[action.uid];
            break;
    }
    next(action);
};
