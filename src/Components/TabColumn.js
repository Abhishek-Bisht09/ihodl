import {Pressable, Text} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';

const TabColumn = ({heading, isActive, onPress}) => {
    const color = isActive ? 'blue' : 'lightgrey';

  return (
    <Pressable
      width="50%"
      alignItems="center"
        // borderBottomWidth={isActive ? 2 : 1}
        // borderColor={isActive ? 'blue.300' : 'lightgrey'}
      paddingY={2}
      onPress={onPress}>
      {isActive ? (
        <ImageBackground
          style={{
            height: 60,
            width: 155,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
          source={require('../assets/button.png')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              //   top: '25%',
            }}>
            {heading}
          </Text>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{
            height: 60,
            width: 155,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
          source={require('../assets/buttonDisabled.png')}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#FFFFFF',
              justifyContent: 'center',
              alignItems: 'center',
              //   top: '25%',
            }}>
            {heading}
          </Text>
        </ImageBackground>
      )}
    </Pressable>
  );
};

export default TabColumn;
