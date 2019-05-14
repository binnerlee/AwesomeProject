import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default class WebViewScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            url: 'http://10.70.136.213:8001/'
        }
    }

    txtSubmitEditing = (e) => {
        let { text } = this.state;

        if(!text || text.length <= 0) {
            return;
        }

        if(!/https?:\/\//.test(text) && text.indexOf('javascript:') != 0) {
            text = `http://${text}`;
        }
        this.setState({
            url: text
        });
    }
    /**
     * @description 获取url请求状态改变事件
     * @param {Object} e
     * e = {
     *  canGoBack: true: 可以返回,false:不可以返回
     *  canGoForward: true:可以前进,false:不可以前进
     *  loading: true:加载中，false:加载完毕
     *  target；9不知道是干嘛的
     *  title:页面当前标题
     *  url:页面要跳转的地址
     * }
     */
    wvNavigationStateChange = (e) => {
        console.log('wvNavigationStateChange',e.url);
        if(!e.loading) {
            this.setState({ text: e.url });
        }
    }
    /**
     * @description 拦截url请求事件
     * @param {Object} e
     * @returns {Boolean} true:正常请求，false:拒绝请求
     */
    wvShouldStartLoadWithRequest = (e) => {
        // console.log('wvShouldStartLoadWithRequest', e.url);
        // if(e.url.indexOf('baidu.com') > -1) {
        //     return true;
        // }
        // console.log('这里有内容的哟');
        // return false;
        return true;
    }
    wvLoadStart = (e) => {
        console.log('wvLoadStart',e);
    }
    wxLoad = (e) => {
        console.log('wxLoad', e);
    }
    wxLoadEnd = (e) => {
        console.log('wxLoadEnd', e);
    }
    wxError = (e) => {
        console.log('wxError', e);
    }
    wxMessage = (e) => {
        console.log('wxMessage', e);
    }
    wxRenderError = (e) => {
        console.log('wxRenderError', e);
    }

    render() {
        return (
            <View style={styles.page}>
                <TextInput style={styles.txtUrl} autoComplete="off" autoCapitalize="none" placeholder="请输入地址" onChangeText={(text) => { this.setState({ text });}} onSubmitEditing={this.txtSubmitEditing} value={this.state.text} />
                <View style={styles.webView}>
                    <WebView
                        onRef={(ref) => { this.webViewRef = ref; }}
                        source={{ uri: this.state.url }}
                        onLoadStart={this.wvLoadStart}
                        onNavigationStateChange={this.wvNavigationStateChange}
                        onShouldStartLoadWithRequest={this.wvShouldStartLoadWithRequest}
                        onLoadEnd={this.wxLoadEnd}
                        onError={this.wxError}
                        onLoad={this.wxLoad}
                        onMessage={this.wxMessage}
                        injectedJavaScript={`console.log('aaa');`}
                        renderError={this.wxRenderError}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        height:'100%'
    },
    txtUrl: {
        height: 40,
        borderWidth:1,
        borderColor:'#ff583a',
        paddingLeft:10,
        paddingRight:10
    },
    webView: {
        flex:1,
        height:'100%',
        borderTopWidth:5,
        borderTopColor:'yellowgreen',
        borderBottomWidth:5,
        borderBottomColor:'yellowgreen'
    }
});