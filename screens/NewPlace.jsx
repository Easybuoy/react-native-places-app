import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";

import { addPlace } from "../store/actions/places";
import ImagePicker from "../components/ImagePicker";

import Colors from "../constants/Colors";

const NewPlace = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(title));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker />
        <Button
          title="Save Place"
          color={Colors.PRIMARY}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlace;
