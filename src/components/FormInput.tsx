import React from 'react';
import { View, Image, TextInput, Text, ImageSourcePropType, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface FormInputProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  error: string | any;
  imageSource: ImageSourcePropType;
  keyboardType?: KeyboardTypeOptions; // Add keyboardType prop
}

const FormInput: React.FC<FormInputProps> = ({ placeholder, value, onChange, onBlur, error, imageSource, keyboardType, ...props }) => (
  <>
    <View style={styles.formTextInput}>
      
      {imageSource && <Image
        source={imageSource}
        style={{ width: 17, aspectRatio: 1 }}
        resizeMode="contain"
      />}
      <TextInput
        style={{ padding: 0, flex:1 }}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={(text) => onChange(text)}
        {...props}
      />
    </View>
    <View>
     {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  </>
);

export default FormInput;

const styles = StyleSheet.create({
  formTextInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor:'#DADADA',
    alignItems: 'center',
    gap: 8,
    height:35,
    marginTop:15
  },
});
