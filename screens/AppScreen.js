import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import TodoInput from '../componets/TodoInput';
import TodoItem from '../componets/TodoItem';
import fetchAPI from '../helpers/FetchApi';

const AppScreen = () => {
  useEffect(() => {
    const getData = async() => {
    const resp = await fetchAPI('/todos');
    setTodoItems(resp.data);
    }
    getData();
  }, []);

  const [todoItems, setTodoItems] = useState([]);

  // Add a new item to the state
  const addTodoItem = async (data) => {
    return await fetchAPI('/todos/add', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        setTodoItems([...todoItems, res.data]);
      })
      .catch((err) =>
        ToastAndroid.show('an error occured', ToastAndroid.SHORT),
      );
  };

  // Delete an item from state by index
  const deleteTodoItem = async (index) => {
    return await fetchAPI(`/todos/${index}`, {
      method: 'DELETE',
    })
      .then(async () => {
        const data = await fetchAPI('/todos');
        setTodoItems(data.data);
      })
      .catch((err) => {
        console.log('errr', err); 
        ToastAndroid.show('an error occured', ToastAndroid.SHORT);
      });
  };

  // Function to set completed to true by index.
  const completeTodoItem = async (_index) => {
    return await fetchAPI(`/todos/${_index.id}`, {
      method: 'PUT',
      body: {
        status: _index.status === 'completed' ? 'pending' : 'completed',
      },
    })
      .then(async () => {
        const data = await fetchAPI('/todos');
        setTodoItems(data.data);
      })
      .catch((err) =>
        ToastAndroid.show('an error occured', ToastAndroid.SHORT),
      );
  };

  // Render
  return (
    <>
      <SafeAreaView
        style={{padding: 16, justifyContent: 'space-between', flex: 1}}>
        <Text style={{fontSize: 36, fontWeight: 'bold'}} testID="todo-title">Todo</Text>
        {todoItems.length === 0 ? (
          <Text style={{fontSize: 20, fontWeight: 'normal', marginTop: 23}}>
            You got an empty list buddy 😀
          </Text>
        ) : null}

        <FlatList
          data={todoItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem
                item={item}
                deleteFunction={() => {
                  deleteTodoItem(item.id);
                }}
                completeFunction={() => {
                  completeTodoItem(item);
                }}
              />
            );
          }}
        />
        <TodoInput onPress={addTodoItem} />
      </SafeAreaView>
    </>
  );
};

export default AppScreen;
