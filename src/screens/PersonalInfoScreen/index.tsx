import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from 'yup';
import { personalAssets } from '../../assets/images';
import FormInput from '../../components/FormInput';
import Stepper from '../../components/Stepper';

const schema = yup.object({
  image: yup.string(),
  firstName: yup
    .string()
    .required('First Name is required')
    .max(10, 'must be less than 10')
    .matches(/^[a-zA-Z]*$/, 'Only letters are allowed'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .max(10, 'must be less than 10')
    .matches(/^[a-zA-Z]*$/, 'Only letters are allowed'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
      'Invalid email format',
    ),
  phone: yup
    .string()
    .required('Phone is required')
    .min(10, 'exact 10 digits required')
    .max(10, '10 digit phone number')
    .matches(/^\d+$/, 'Only digits are allowed'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  experience: yup
    .number()
    .positive('Must be a positive number')
    .integer('Must be an integer')
    .required('Experience is required'),
});
type PersonalInfo = yup.InferType<typeof schema>;

const PersonalInfoScreen = () => {
  const [barIndex, setBarIndex] = useState(0);
  const formMethods = useForm<PersonalInfo>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors},
  } = formMethods;
  const onSubmit: SubmitHandler<PersonalInfo> = data => console.log({data});
  const handleAddImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setValue('image', image.path);
    });
  };
  const selectedImage = watch('image');

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#2B2F4C'} />
      {/* Top Section */}
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#273372', '#23284B']}
        style={styles.topContainer}>
        <Pressable
          onPress={() => setBarIndex(prev => (prev == 2 ? 0 : prev + 1))}>
          <Image source={personalAssets.play} style={{alignSelf: 'center'}} />
        </Pressable>
        <Stepper currentStep={barIndex} totalSteps={3} />
      </LinearGradient>

      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={{paddingBottom: 60}}>
          <Text style={styles.heading}>Personal Info</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 20,
              alignItems: 'center',
              marginBottom: 0,
            }}>
            {selectedImage ? (
              <TouchableOpacity onPress={()=>setValue('image','')}>
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 100, height: 100, borderRadius:50}}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={handleAddImage}>
                  <View style={styles.addbutton}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: '#2A2E49'}}>
                  Add profile image
                </Text>
              </>
            )}
          </View>

          <Controller
            control={control}
            name="firstName"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.user}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="First Name"
                error={errors[name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.user}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Last Name"
                error={errors[name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.email}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
                error={errors[name]?.message}
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.phone}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Phone"
                error={errors[name]?.message}
                keyboardType="numeric"
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.world}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Country"
                error={errors[name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.glyph}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="City"
                error={errors[name]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="experience"
            render={({field: {onChange, onBlur, value, name}}) => (
              <FormInput
                imageSource={personalAssets.certificate}
                onChange={txt => {
                  if (txt == '') {
                    onChange(0);
                  }
                  const intValue = parseInt(txt);
                  if (!isNaN(intValue)) {
                    onChange(intValue);
                  }
                }}
                onBlur={onBlur}
                value={value ? `${value}` : ''}
                placeholder="Experience"
                error={errors[name]?.message}
                keyboardType="number-pad"
              />
            )}
          />
        </ScrollView>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => formMethods.handleSubmit(onSubmit)}
        style={styles.button}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#5063EE', '#2B2F4C']}
          style={{flex: 1}}>
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  formTextInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    alignItems: 'center',
    gap: 8,
    height: 35,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2A2E49',
  },
  scroll: {
    padding: 15,
    paddingTop: 18,
    paddingBottom: 50,
  },
  addbutton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 1,
  },
  button: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    height: 50,
    marginVertical: 5,
    overflow: 'hidden',
  },
  topContainer: {
    borderWidth: 1,
    height: '25%',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
