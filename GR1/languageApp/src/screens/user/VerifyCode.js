import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';
import AppText from '../../components/app-text';
import { useTheme } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  MaskSymbol,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import lock from '../../assets/images/lock.jpg';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20,},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 60,
    height: 60,
    // lineHeight: 38,
    lineHeight: 60,
    fontSize: 30,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
},
button: {
  alignItems: 'center',
  marginTop: 50
},
images: {
  height: 200,
  width: '100%',
  marginTop: 20,
  marginBottom: 20
},
textenter: { 
  alignSelf: 'center'
}
});

const CELL_COUNT = 4;

const VerifyCode = () => {
  const { colors } = useTheme();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Icon name={'arrow-back'} size={29} style={{color: colors.text}} />
        <AppText style={styles.title} i18nKey={'verification'}/>
        <View />
      </View>
      <Image
        style={styles.images}
        source={lock}
      />
      <AppText style={styles.textenter} i18nKey={'Please enter the verfication code'} />
      <AppText style={styles.textenter} i18nKey={'we send to your email address'} />
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol ? (
              // use special component for masking
              <MaskSymbol
                isLastFilledCell={isLastFilledCell({index, value})}
                maskSymbol="*">
                {symbol}
              </MaskSymbol>
            ) : (
              isFocused && <Cursor />
            )}
          </Text>
        )}
      />

      <TouchableOpacity>
          <AppText style={{color: '#009387', marginTop:15}} i18nKey={'resend code'}/>
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity
                style={[styles.signIn, {backgroundColor: '#009387'}]}
                onPress = {() => signUp()}
            >
            <View
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
            >
                <AppText style={[styles.textSign, {
                    color:'white'
                }]} i18nKey={'verify'}/>
            </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;