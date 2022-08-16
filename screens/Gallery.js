import React from 'react'
import { WebView } from 'react-native-webview';

function Gallery() {
    return (
       <WebView source={{ uri: 'http://vsss2.info2ideas.com/gallery' }} />
    )
}

export default Gallery
