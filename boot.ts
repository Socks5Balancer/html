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

// https://github.com/moment/moment/issues/463#issuecomment-552498641

import moment from 'moment';
import 'moment/locale/zh-cn.js';
import Vue from 'vue';
import _ from "lodash";

import 'i18n-table/en-US';
import 'i18n-table/zh-CN';
import {I18NTableType} from './I18NTableType';
import {ServerStateType} from './ServerStateType';
import {
    tryGetBackendConfigFromServer,
    serverTimeString2Moment,
    getBackend,
    getSearchParams,
    getI18nTable,
    SelectableI18NLanguageTable,
    setBackend,
    reduceField,
    dataCount2String,
    defaultBackendHost,
    defaultBackendPort,
    formatData,
    speed2String,
    formatSpeed,
    formatInt,
    formatSpeedMax,
    setSearchParams,
    formatNumber2FixedLength,
} from './utils';

import {ChartData, Chart, registerables, ChartItem} from "chart.js";

Chart.register(...registerables);

getI18nTable(() => {
    app && app.flushI18nTable();
});
window.getI18nTable = getI18nTable.bind(undefined, () => {
    app && app.flushI18nTable();
});

class VueAppData {
    i18nTable: I18NTableType = {} as any;
    ServerJsonInfo_Show = false;
    ServerJsonInfo: ServerStateType | any = {};
    upstreamPool: ServerStateType['pool']['upstream'] = [];
    rule = "";
    nowTime = "";
    startTime = "";
    runTime = "";
    relayId = "";
    relayIdMod = "";
    runTimeString = "";
    runTimeString2 = "";
    lastConnectComeTime = "";
    lastConnectComeTimeAgo = 0;
    lastConnectComeTimeAgoString = "";
    lastConnectComeTimeAgoString2 = "";
    listenOn = "";
    multiListen = "";
    haveUsableServer = true;
    UpstreamSelectRuleList: ServerStateType['RuleEnumList'] = [];
    lastUseUpstreamIndex: ServerStateType['pool']['getLastUseUpstreamIndex'] = "0";
    lastConnectServerIndex = 0;
    lastConnectServer: ServerStateType['pool']["upstream"][0] = {} as any;
    //isWork= checkServer;
    //speedArray= speedArray;
    //dataArray= dataArray;
    newRule = "";
    allConnectCount = 0;
    totalUp = 0;
    disableConnectTest = false;
    traditionTcpRelay = false;
    totalDown = 0;
    totalUpSpeed = 0;
    totalDownSpeed = 0;
    totalUpSpeedMax = 0;
    totalDownSpeedMax = 0;
    sleepTime = 0;
    UpstreamIndex: ServerStateType['UpstreamIndex'] = [];
    ClientIndex: ServerStateType['ClientIndex'] = [];
    ListenIndex: ServerStateType['ListenIndex'] = [];
    AuthIndex: ServerStateType['AuthIndex'] = [];

    get backend() {
        return getBackend();
    };

    set backend(s) {
        setBackend(s);
    };

    InternetState = {
        isOk: false,
        error: undefined,
    };
    autoFlushState = false;
    autoFlushHandle: any = -1;
    tableState = window.i18nTable;

    set nowLang(l: string) {
        getI18nTable(() => {
            app && app.flushI18nTable();
        }, l as any);
        location.reload();
    }

    get nowLang() {
        const ls = localStorage.getItem('selectedLanguageI18nTable');
        const lang = ls || window.navigator.language;
        return lang;
    }

    SelectableI18NLanguageTable = SelectableI18NLanguageTable;
}

class VueAppMethods {
    formatSpeedMax = formatSpeedMax;
    formatSpeed = formatSpeed;
    formatData = formatData;
    speed2String = speed2String;
    dataCount2String = dataCount2String;
    reduceField = reduceField;
    calcDurationOfTimeStringFromNowTime = (ts: string) => {
        if (ts === "<empty>") {
            return "<empty>";
        }
        return window.i18nTable.formatDurationFunction.f!(moment.duration(
            serverTimeString2Moment(app.nowTime).valueOf() - serverTimeString2Moment(ts).valueOf()
        ).asMilliseconds());
    };
    autoFlush = () => {
        app.autoFlushState = !app.autoFlushState;
        console.log('autoFlushHandle app.autoFlushState', app.autoFlushState);
        if (app.autoFlushState) {
            console.log('autoFlushHandle setInterval');
            app.autoFlushHandle = setInterval(function () {
                console.log('autoFlushHandle flush');
                app.flush()
                    .then(() => {
                        app.$forceUpdate();
                    });
            }, 1000);
        } else {
            console.log('autoFlushHandle clearTimeout');
            clearInterval(app.autoFlushHandle)
        }
    };
    flush = async () => {
        return fetch('http://' + app.$data.backend + '/', {
            credentials: 'omit'
        }).then((T) => {
            if (T.ok) {
                return T.json();
            }
            return Promise.reject(T);
        }).then((T: ServerStateType) => {
            console.log(T);
            if (
                _.has(T, 'pool') &&
                _.has(T, 'config') &&
                _.isObject(T.pool) &&
                _.isArray(T.pool.upstream) &&
                _.isObject(T.config)
            ) {
                app.ServerJsonInfo = T;
                app.lastUseUpstreamIndex = T.pool.getLastUseUpstreamIndex;
                if (_.isArray(T.pool.upstream)) {
                    app.upstreamPool = T.pool.upstream;
                } else {
                    app.upstreamPool = [];
                }
                app.upstreamPool = app.upstreamPool.map((N: ServerStateType['pool']['upstream'][0]) => {
                    N.index = _.parseInt(N.index as string);
                    return N;
                })
                app.UpstreamSelectRuleList = T.RuleEnumList;
                app.rule = T.nowRule;
                app.newRule = T.nowRule;
                app.totalUp = _.reduce(app.upstreamPool, function (acc, n) {
                    return acc + _.parseInt(n.byteUpLast);
                }, 0);
                app.totalUp = reduceField(app.upstreamPool, 'byteUpLast');
                app.totalDown = reduceField(app.upstreamPool, 'byteDownLast');
                app.totalUpSpeed = reduceField(app.upstreamPool, 'byteUpChange');
                app.totalDownSpeed = reduceField(app.upstreamPool, 'byteDownChange');
                app.totalUpSpeedMax = reduceField(app.upstreamPool, 'byteUpChangeMax');
                app.totalDownSpeedMax = reduceField(app.upstreamPool, 'byteDownChangeMax');

                app.sleepTime = _.parseInt(_.get(T, 'config.sleepTime', '' + Number.MAX_SAFE_INTEGER));
                app.nowTime = T.nowTime;

                app.relayIdMod = T.config.relayIdMod;
                app.relayId = T.config.relayId;

                app.runTime = T.runTime;
                app.runTimeString = moment.duration(_.parseInt(T.runTime)).humanize();
                app.runTimeString2 = window.i18nTable.formatDurationFunction.f!(_.parseInt(T.runTime));

                app.startTime = T.startTime;

                if (_.isArray(T.UpstreamIndex)) {
                    app.UpstreamIndex = T.UpstreamIndex.map(N => {
                        N.byteInfo = 'true';
                        N.index = _.parseInt(N.index as string);
                        return N;
                    });
                } else {
                    app.UpstreamIndex = [];
                }
                if (_.isArray(T.ClientIndex)) {
                    app.ClientIndex = T.ClientIndex.map(N => {
                        N.byteInfo = 'true';
                        N.lastUseUpstreamIndex = _.parseInt(N.lastUseUpstreamIndex as string);
                        return N;
                    });
                } else {
                    app.ClientIndex = [];
                }
                if (_.isArray(T.ListenIndex)) {
                    app.ListenIndex = T.ListenIndex.map(N => {
                        N.byteInfo = 'true';
                        N.lastUseUpstreamIndex = _.parseInt(N.lastUseUpstreamIndex as string);
                        return N;
                    });
                } else {
                    app.ListenIndex = [];
                }
                if (_.isArray(T.AuthIndex)) {
                    app.AuthIndex = T.AuthIndex.map(N => {
                        N.byteInfo = 'true';
                        N.lastUseUpstreamIndex = _.parseInt(N.lastUseUpstreamIndex as string);
                        if (N.AuthUser) {
                            N.user = N.AuthUser.user || "";
                            N.pwd = N.AuthUser.pwd || "";
                            N.base64 = N.AuthUser.base64 || "";
                        }
                        return N;
                    });
                } else {
                    app.AuthIndex = [];
                }

                app.lastConnectComeTime = T.pool.lastConnectComeTime;
                app.lastConnectComeTimeAgo = _.parseInt(T.pool.lastConnectComeTimeAgo);
                app.lastConnectComeTimeAgoString = moment.duration(app.lastConnectComeTimeAgo).humanize();
                app.lastConnectComeTimeAgoString2 = window.i18nTable.formatDurationFunction.f!(app.lastConnectComeTimeAgo);

                app.lastConnectServerIndex = _.parseInt(T.lastConnectServerIndex);
                app.lastConnectServer = app.upstreamPool.find(function (n: ServerStateType['pool']['upstream'][0]) {
                    return _.parseInt(n.index as string) === app.lastConnectServerIndex;
                }) || {} as any;
                app.listenOn = ' ' + T.config.listenHost + ' : ' + T.config.listenPort;
                app.listenOn = ' ' + T.config.listenHost + ' : ' + T.config.listenPort;
                app.multiListen = ' ' + T.config.multiListen.map(T => `${T.host}:${T.port}`).join(', ');

                app.allConnectCount = _.reduce(T.pool.upstream, function (acc, T) {
                    return acc + _.parseInt(T.connectCount);
                }, 0);

                if (T.config.disableConnectTest === 'true') {
                    app.disableConnectTest = true;
                }
                if (T.config.traditionTcpRelay === 'true') {
                    app.traditionTcpRelay = true;
                }

                app.InternetState.isOk = true;
                app.InternetState.error = undefined;
            }
        }).then(function () {
            console.log(app);
        }).catch(function (e) {
            console.error(e);
            app.InternetState.isOk = false;
            app.InternetState.error = e;
        });
    };
    sendCommand = (cmd: string) => {
        fetch('http://' + app.$data.backend + cmd, {
            credentials: 'omit'
        }).then(function (T) {
            if (T.ok) {
                return T;
            }
            return Promise.reject(T);
        }).catch(function (e) {
            console.error(e);
        }).then(function () {
            app.flush();
        });
    };
    flushI18nTable = () => {
        console.log('flushI18nTable');
        app.$set(app.$data, 'i18nTable', window.i18nTable);
        console.log('i18nTable', app.$data.i18nTable);
        app.$forceUpdate();
    };
}

var app: Vue & VueAppData & VueAppMethods = new Vue({
    el: '#body',
    data: new VueAppData(),
    computed: {},
    methods: new VueAppMethods(),
});
app.flushI18nTable();
tryGetBackendConfigFromServer(() => {
    return app.flush();
});
