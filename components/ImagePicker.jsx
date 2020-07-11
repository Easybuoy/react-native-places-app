import React, { useState } from "react";
import { View, Button, Text, Image, StyleSheet, Alert } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { askAsync, CAMERA, CAMERA_ROLL } from "expo-permissions";

import Colors from "../constants/Colors";

const ImagePicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState("");
  const verifyPermision = async () => {
    const result = await askAsync(CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant permissions to use the app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermision();
    if (!hasPermissions) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No Image Picked Yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.PRIMARY}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
