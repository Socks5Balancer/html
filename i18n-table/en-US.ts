/**
 * Socks5BalancerAsio : A Simple TCP Socket Balancer for balance Multi Socks5 Proxy Backend Powered by Boost.Asio
 * Copyright (C) <2020>  <Jeremie>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import moment from 'moment';

// @ts-ignore
function formatInt(int: number) {
    if (int < 10) {
        return `0${int}`;
    }
    return `${int}`;
}


export interface I18NTableType {
    [key: string]: { s: string, f?: CallableFunction },

    formatDurationFunction: { s: string, f: (time: number) => string },
    emptyFilterFunction: { s: string, f: (s: string) => string },
    emptyFilterPingFunction: { s: string, f: (s: string) => string },
}


// @ts-ignore
window.i18n = window.i18n || {};
// @ts-ignore
export const enUS = (() => {
    const tableState: I18NTableType = {
        formatDurationFunction: {
            s: "formatDurationFunction", f: (time: number) => {
                const seconds = moment.duration(time).seconds();
                const minutes = moment.duration(time).minutes();
                const hours = moment.duration(time).hours();
                const days = moment.duration(time).days();
                const months = moment.duration(time).months();
                const years = moment.duration(time).years();
                if (years > 0) {
                    return `${years}Y-${months}M-${days}Day ${formatInt(hours)}h:${formatInt(minutes)}m:${formatInt(seconds)}s`;
                }
                if (months > 0) {
                    return `${months}M-${days}Day ${formatInt(hours)}h:${formatInt(minutes)}m:${formatInt(seconds)}s`;
                }
                if (days > 0) {
                    return `${days}Day ${formatInt(hours)}h:${formatInt(minutes)}m:${formatInt(seconds)}s`;
                }
                if (hours > 0) {
                    return `${formatInt(hours)}h:${formatInt(minutes)}m:${formatInt(seconds)}s`;
                }
                if (minutes > 0) {
                    return `${formatInt(minutes)}m:${formatInt(seconds)}s`;
                }
                return `00m:${formatInt(seconds)}s`;
            }
        },
        emptyFilterFunction: {
            s: "emptyFilterFunction", f: (s: string) => {
                return s === "<empty>" ? "<empty>" : s;
            }
        },
        emptyFilterPingFunction: {
            s: "emptyFilterPingFunction", f: (s: string) => {
                return s === "<empty>" ? "无" : (s + "ms");
            }
        },
        Socks5BalancerAsio: {s: "Socks5BalancerAsio"},
        allConnectCountNotice: {s: "now running connect:"},
        nowRuleNotice: {s: "now rule:"},
        buttonChange: {s: "Change It"},
        backend: {s: "backend:"},
        Flush: {s: "Flush"},
        AutoFlush: {s: "AutoFlush", f: (b: boolean) => b ? `AutoFlush ⚪On` : `AutoFlush ⚫Off`},
        NoUsableServer: {s: "Warning: we don't have Usable Server !!! "},
        NoServer: {s: "No Server ..."},
        NoDataComeFromServer: {s: "No Data Come From Server."},
        DisableConnectTestMode: {s: "Now Running On [DisableConnectTest] Mode."},
        NumberSerial: {s: "No."},
        Host_Port: {s: "Host:Port"},
        name: {s: "name"},
        online: {s: "online"},
        work: {s: "work"},
        runCount: {s: "run"},
        lastTCPCheckTime: {s: "lastTCPCheckTime"},
        lastTCPPing: {s: "Backend Ping"},
        afterLastTCPCheckTime: {s: "time after"},
        lastConnectCheckTime: {s: "lastConnectCheckTime"},
        lastConnectPing: {s: "Proxy Ping"},
        afterLastConnectCheckTime: {s: "time after"},
        ManualDisable: {s: "ManualDisable"},
        Usable: {s: "Usable"},
        CloseConnect: {s: "Close Connect"},
        Select: {s: "Select"},
        Check: {s: "Check"},
        data: {s: "data"},
        speedMax: {s: "speedMax"},
        speed: {s: "speed"},
        online_Unknown: {s: "Unknown"},
        online_True: {s: "True"},
        online_False: {s: "False"},
        work_Unknown: {s: "Unknown"},
        work_True: {s: "True"},
        work_False: {s: "False"},
        Disabled: {s: "Disabled"},
        Enabled: {s: "Enabled"},
        EnableIt: {s: "Enable It"},
        Enable: {s: "Enable"},
        Disable: {s: "Disable"},
        Usable_True: {s: "True"},
        Usable_False: {s: "False"},
        // CloseConnect: {s: "Close Connect"},
        UseNow: {s: "Use Now"},
        CheckNow: {s: "Check Now"},
        CleanCheckState: {s: "Clean Check State"},
        ForceCloseAllConnect: {s: "Force Close All Connect"},
        ForceCheckAllNow: {s: "Force Check All Now"},
        lastConnectServer: {s: "lastConnectServer:"},
        lastUseUpstreamIndex: {s: "lastUseUpstreamIndex:"},
        TraditionMode: {s: "Tradition Mode"},
        MixedMode: {s: "Mixed Mode"},
        TcpRelayMode: {s: "Tcp Relay Mode:"},
        nowTime: {s: "now time:"},
        startTime: {s: "startTime:"},
        runTime: {s: "runTime:"},
        lastConnectComeTime: {s: "lastConnectComeTime:"},
        isSleeping: {s: "isSleeping:"},
        sleeping: {s: "sleeping"},
        listenOn: {s: "listen On:"},
        totalHistoryConnectCount: {s: "Total History Connect Count: "},
        ClientConnectInfo: {s: "Client Connect Info"},
        Host: {s: "Host"},
        lastServer: {s: "lastServer"},
        newServer: {s: "newServer"},
        nowRule: {s: "nowRule"},
        newRule: {s: "newRule"},
        running: {s: "running"},
        closeConnect: {s: "closeConnect"},
        // data: {s: "data"},
        // speedMax: {s: "speedMax"},
        // speed: {s: "speed"},
        // detail: {s: "detail"},
        // CloseConnect: {s: "CloseConnect"},
        // detail: {s: "detail"},
        ListenPortInfo: {s: "Listen Port Info"},
        AuthUserInfo: {s: "Auth User Info"},
        AuthUserInfoId: {s: "id"},
        AuthUserInfoName: {s: "UserName"},
        AuthUserInfoPwd: {s: "Password"},
        AuthUserInfoBase64String: {s: "AuthBase64"},
        FastIssueResolve: {s: "Fast Issue Resolve"},
        WebPageOpenVerySlow: {s: "Web page Open very Sloooow :"},
        // ForceCloseAllConnect: {s: "Force Close All Connect"},
        SeemsLikeServerStateNotUpdate: {s: "Seems like Server State not update :"},
        IWantToDisableAllServer: {s: "I Want To Disable All Server :"},
        DisableAllServer: {s: "Disable All Server"},
        IWantToEnableAllServer: {s: "I Want To Enable All Server :"},
        EnableAllServer: {s: "Enable All Server"},
        clickToShowDetail: {s: "click to show detail"},
        timeMs: {s: "ms"},
        total: {s: "total"},
    };
    return tableState;
})();


// @ts-ignore
window.i18n = window.i18n || {};
// @ts-ignore
window.i18n.enUS = enUS;

