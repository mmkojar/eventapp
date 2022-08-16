import React from 'react'
import { View, StyleSheet} from 'react-native';
import { Button,withTheme } from 'react-native-paper';

function CustomButtons({theme,title,pressHandler}) {
    return (
        <View>            
             <Button mode="contained" style={styles.c_button} color={title == 'Logout' ? '#dc3545' : theme.colors.primary} onPress={pressHandler}>
                {title}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    c_button:{
        // alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:4,
        borderRadius:20,
        fontWeight:900,            
        fontFamily:'VarelaRound-Regular'
    }
})

export default withTheme(CustomButtons)
