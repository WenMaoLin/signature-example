import React, { useState } from 'react';
import { View, Image, Text, Button } from 'react-native';
import styles from './style';

export default () => {
  const [user, setUser] = useState({ username: null, avatar: null });

  const onGetUserInfo = ({ detail }) => {
    setUser({
      avatar: detail.userInfo.avatarUrl,
      username: detail.userInfo.nickName,
    });
  }

  return (
    <View style={styles.container}>
      {
        typeof user.username === 'string' ? (
          <>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.message}>{user.username}</Text>
          </>
        ) : (
          <Button type='primary' openType="getUserInfo" title="获取信息" onGetUserInfo={onGetUserInfo} />
        )
      }
    </View>
  );
};
