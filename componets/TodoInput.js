import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {Button, Overlay, Header, Input, Text} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

const {width, height} = Dimensions.get('screen');

export default function TodoInput(props) {
  const [inputValues, setInputValues] = useState({});
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
    setInputValues({});
  };

  const addNewTodo = () => {
    if (
      inputValues.category === undefined ||
      inputValues.description === undefined ||
      inputValues.dueDate === undefined ||
      inputValues.category === '' ||
      inputValues.description === '' ||
      inputValues.dueDate === ''
    ) {
      return Alert.alert('Please add todo details');
    }
    props.onPress(inputValues);
    setVisible(!visible);
  };

  const inputError = (errorLabel) => (
    <View>
      <Text style={styles.error}>{errorLabel}</Text>
    </View>
  );

  return (
    <>
      <Button
        buttonStyle={styles.todoBtn}
        title="New Todo"
        onPress={toggleOverlay}
      />
      <Overlay
        fullScreen={true}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <Header
          backgroundColor="white"
          placement="left"
          leftComponent={{
            icon: 'close',
            color: 'black',
            left: -6,
            onPress: () => toggleOverlay(),
          }}
        />
        <Text style={{fontSize: 36, fontWeight: 'bold', left: 13}}>
          New Todo
        </Text>
        <View style={styles.OverlayCtn}>
          <Input
            onChangeText={(e) => {
              setInputValues({...inputValues, category: e});
            }}
            placeholder="Category"
            maxLength={25}
          />
          {inputValues.category === ''
            ? inputError('Category cant be empty')
            : null}
          <Input
            placeholder="Description"
            maxLength={30}
            onChangeText={(e) => {
              setInputValues({...inputValues, description: e});
            }}
          />
          {inputValues.description === ''
            ? inputError('Description cant be empty')
            : null}
          <Text style={{fontSize: 20, left: 10, marginBottom: 13}}>
            Due Date
          </Text>
          <DatePicker
            onDateChange={(d) => setInputValues({...inputValues, dueDate: d})}
            style={styles.dateStyle}
          />

          <Button
            buttonStyle={styles.addBtn}
            title="Add Todo"
            onPress={addNewTodo}
          />
        </View>
      </Overlay>
    </>
  );
}
const styles = StyleSheet.create({
  todoBtn: {
    backgroundColor: 'black',
  },
  addBtn: {
    backgroundColor: 'black',
    width: width - 40,
    left: 10,
    marginTop: 21,
  },
  OverlayCtn: {
    marginTop: 13,
    paddingRight: 0,
    paddingLeft: 0,
    width: width - 20,
    height: height - 200,
  },
  dateStyle: {
    width: width - 30,
    left: 10,
  },
  error: {
    color: 'red',
    fontSize: 15,
    left: 10,
    marginBottom: 12,
    marginTop: -12,
  },
});
