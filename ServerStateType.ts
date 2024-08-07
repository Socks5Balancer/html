
export interface ServerStateType {
    config: {
        listenHost: string,
        listenPort: string,
        testRemoteHost: string,
        testRemotePort: string,
        stateServerHost: string,
        stateServerPort: string,
        retryTimes: string,
        disableConnectTest: string,
        traditionTcpRelay: string,
        serverChangeTime: string,
        connectTimeout: string,
        sleepTime: string,
        tcpCheckPeriod: string,
        tcpCheckStart: string,
        connectCheckPeriod: string,
        connectCheckStart: string,
        additionCheckPeriod: string,
        relayId: string,
        relayIdMod: string,
        upstream: {
            name: string,
            host: string,
            port: string,
            disable: string,
        }[],
        multiListen: {
            host: string,
            port: string,
        }[],
        EmbedWebServerConfig: {
            enable: string,
            host: string,
            port: string,
            backendHost: string,
            backendPort: string,
            root_path: string,
            index_file_of_root: string,
            backend_json_string: string,
        },
    },
    nowRule: string,
    pool: {
        getLastUseUpstreamIndex: string,
        lastConnectComeTime: string,
        lastConnectComeTimeAgo: string,
        upstream: {
            index: string | number,
            name: string,
            host: string,
            port: string,
            isOffline: string,
            lastConnectFailed: string,
            isManualDisable: string,
            disable: string,
            lastConnectCheckResult: string,
            connectCount: string,
            lastOnlineTime: string,
            lastConnectTime: string,
            isWork: string,
            byteDownChange: string,
            byteUpChange: string,
            byteDownLast: string,
            byteUpLast: string,
            byteUpChangeMax: string,
            byteDownChangeMax: string,
            sessionsCount: string,
            connectCount2: string,
            byteInfo: string,
        }[]
    },
    RuleEnumList: string[],
    lastConnectServerIndex: string,
    UpstreamIndex: {
        index: string | number,
        connectCount: string,
        sessionsCount: string,
        byteDownChange: string,
        byteUpChange: string,
        byteDownLast: string,
        byteUpLast: string,
        byteUpChangeMax: string,
        byteDownChangeMax: string,
        rule: string,
        lastUseUpstreamIndex: string | number,
        byteInfo: string,
    }[],
    ClientIndex: {
        index: string | number,
        connectCount: string,
        sessionsCount: string,
        byteDownChange: string,
        byteUpChange: string,
        byteDownLast: string,
        byteUpLast: string,
        byteUpChangeMax: string,
        byteDownChangeMax: string,
        rule: string,
        lastUseUpstreamIndex: string | number,
        byteInfo: string,
    }[],
    ListenIndex: {
        index: string | number,
        connectCount: string,
        sessionsCount: string,
        byteDownChange: string,
        byteUpChange: string,
        byteDownLast: string,
        byteUpLast: string,
        byteUpChangeMax: string,
        byteDownChangeMax: string,
        rule: string,
        lastUseUpstreamIndex: string | number,
        byteInfo: string,
    }[],
    AuthIndex: {
        id: string | number,
        connectCount: string,
        sessionsCount: string,
        byteDownChange: string,
        byteUpChange: string,
        byteDownLast: string,
        byteUpLast: string,
        byteUpChangeMax: string,
        byteDownChangeMax: string,
        rule: string,
        lastUseUpstreamIndex: string | number,
        AuthUser: {
            ok: string,
            id: string,
            user: string,
            pwd: string,
            base64: string,
        },
        byteInfo: string,
        user: string,
        pwd: string,
        base64: string,
    }[],
    startTime: string,
    runTime: string,
    nowTime: string,
    VersionInfoString: string,
}
