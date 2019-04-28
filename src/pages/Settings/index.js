import React from 'react';
import { Text, View } from 'react-native';
import WebView from 'react-native-webview';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import parse from 'url-parse';

const SCHEME = {
    /**
     * h5向app发送消息
     */
    SEND_MESSAGE : 'send_message'
};

const MsgModel = {
    receiveMessage : (params) => {
        //模拟延时请求
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(params.data);
            }, parseInt(Math.random() * 5000));
        });
    },
    responseMessage: (webview, params = {}) => {
        if(!webview) {
            console.error('webview未初始化');
            return false;
        }

        if(!params.cbkey) {
            params.cbkey = 'initiative';
        }

        webview.injectJavaScript(`
            try {
                if(window && window.UxJsBridge && window.UxJsBridge.CallBack) {
                    window.UxJsBridge.CallBack('${params.cbkey}', {'data':'${params.data}'});
                }
            } catch(e) {
                alert('出错了' + e.message);
            }
        `);
    }
}

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'h5与app 使用jsbridge交互',
    };

    state = {
        status: '[Ready] Waiting For WebView Ready',
        value: ''
    }

    constructor() {
        super();
        this.webview = null;
    }

    handleSet = (e) => {
        this.webview.postMessage(this.state.value);
        //MsgModel.responseMessage(this.webview, { data: this.state.value });
    }

    urlParser = (href) => {
        // let result = url.match(/jsbridgeuxinh5:\/\/([^\?]+)(\?[^\s]+)?$/);
        let result = parse(href, true);

        let { hostname:scheme, query:params } = result;

        return { scheme, params };
    }
    handleChange = (value) => {
        this.setState({ value })
    }
    /**
     * @description 拦截url请求事件
     * @param {Object} e
     * @returns {Boolean} true:正常请求，false:拒绝请求
     */
    wvShouldStartLoadWithRequest = async (e) => {
        if(e.url.indexOf('jsbridgeuxinh5://') !== 0) {
            return true;
        }

        let { scheme, params } = this.urlParser(decodeURIComponent(e.url));

        switch(scheme) {
            case SCHEME.SEND_MESSAGE:

                let result = await MsgModel.receiveMessage(params);

                MsgModel.responseMessage(this.webview, {...params, data:'收到你的消息咯。'});

                this.setState({
                    status: result
                });
            break;
        }

        return false;
    }

    handleMessage = (e) => {
      const message = e.nativeEvent.data;
      console.log(message);
    }

    renderWebSide() {
        return (
            <View style={styles.webviewArea}>
                <WebView useWebKit
                    ref={webview => this.webview = webview}
                    onMessage={this.handleMessage}
                    onShouldStartLoadWithRequest={this.wvShouldStartLoadWithRequest}
                    injectedJavaScript={`console.log('aaa');`}
                    source={{uri:'http://10.70.141.64:8001/wv'}}
                />
            </View>
        )
    }
    renderRNSide() {
        return (
            <View style={styles.rnArea}>
                <Text style={styles.titleText}>React Naitve Side: </Text>
                <Text style={styles.statusText}>{this.state.status}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Some..."
                    value={this.state.value}
                    onChangeText={this.handleChange} />
                <View>
                    <TouchableOpacity style={styles.button} onPress={this.handleSet}><Text>Send To Web</Text></TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={this.handleGet}><Text>Get From Web</Text></TouchableOpacity> */}
                </View>
            </View>
        )
    }

    componentDidMount() {
        
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return (
            <View style={styles.container}>
                {this.renderRNSide()}
                {this.renderWebSide()}
            </View>
        );
    }
}

const styles = {
    container: {
        paddingTop: 20,
        flex: 1
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statusText: {
        fontSize: 12,
        marginBottom: 5,
        textAlign: 'center'
    },
    input: {
        margin: 5,
        padding: 5,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5
    },
    rnArea: {
        flex: 1,
        borderWidth: 4,
        borderColor: '#666',
        borderStyle: 'solid',
        padding: 5,
    },
    button: {
        borderColor: '#000',
        borderWidth: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        borderRadius: 15,
    },
    webviewArea: {
        flex: 1.5,
        borderWidth: 4,
        borderColor: '#000',
        borderStyle: 'solid'
    }
}