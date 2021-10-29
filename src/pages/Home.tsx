import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([
      ...tasks,
      { title: newTaskTitle, done: false, id: Math.random() },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const taskDone = tasks.find((task: Task) => task.id === id);
    if (taskDone) {
      taskDone.done = !taskDone.done;
      setTasks([...tasks]);
      console.log(tasks);
    }

  }

  const countTasksPending = useMemo(() => {
    return tasks.filter((task: Task) => !task.done).length;
  }, [tasks]);

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((task: Task) => task.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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
