import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExists = tasks.find((task) => task.title === newTaskTitle);

    if (taskExists) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome',
      );
    }

    if (
      newTaskTitle !== '' &&
      newTaskTitle.length <= 40 &&
      newTaskTitle.trim() !== ''
    ) {
      setTasks([
        ...tasks,
        { title: newTaskTitle, done: false, id: Math.random() },
      ]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const taskDone = tasks.find((task: Task) => task.id === id);
    if (taskDone) {
      taskDone.done = !taskDone.done;
      setTasks([...tasks]);
    }
  }

  const countTasksPending = useMemo(() => {
    return tasks.filter((task: Task) => !task.done).length;
  }, [tasks]);

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => setTasks(tasks.filter((task: Task) => task.id !== id)),
        },
      ],
    );
  }

  function handleEditTask(id: number, newTaskTitle: string) {
    const taskEdit = tasks.find((task: Task) => task.id === id);
    if (taskEdit) {
      taskEdit.title = newTaskTitle;
      setTasks([...tasks]);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
