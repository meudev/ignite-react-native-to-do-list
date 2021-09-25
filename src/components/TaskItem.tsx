import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import cancelIcon from '../assets/icons/cancel/cancel.png'
import { Task } from './TasksList';

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    };

    function handleCancelEditing() {
        setTaskNewTitleValue(task.title);
        setIsEditing(false);
    };

    function handleSubmitEditing() {
        editTask(task.id, taskNewTitleValue);
        setIsEditing(false);
    };

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                //TODO - use onPress (toggle task) prop
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    //TODO - use style prop 
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={taskNewTitleValue}
                        onChangeText={setTaskNewTitleValue}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    //TODO - use style prop
                    />

                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ?
                    <TouchableOpacity
                        testID={`trash-${index}`}
                        style={{ paddingRight: 12, justifyContent: 'center' }}
                        onPress={handleCancelEditing}
                    //TODO - use onPress (remove task) prop
                    >
                        <Image source={cancelIcon} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        testID={`trash-${index}`}
                        style={{ paddingRight: 12, justifyContent: 'center' }}
                        onPress={handleStartEditing}
                    //TODO - use onPress (remove task) prop
                    >
                        <Image source={editIcon} />
                    </TouchableOpacity>
                }

                <View style={styles.separator} />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingLeft: 12, justifyContent: 'center' }}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditing}
                //TODO - use onPress (remove task) prop
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        alignContent: 'flex-end',
        flexDirection: 'row',
        paddingHorizontal: 24,
    },
    separator: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
    }
})