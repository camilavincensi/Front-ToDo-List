import styles from './Task.module.css';
import {ClipboardText, PlusCircle} from "phosphor-react";
import {ToDoCards} from "./ToDoCards.tsx";
import {ChangeEvent, FormEvent, InvalidEvent, useState} from "react";

export function Task() {

    const initArr: string[] = [];

    const [taskCount, setTaskCount] = useState(0);

    const [newTaskText, setNewTaskText] = useState('')

    const [cards, setCards] = useState(initArr);

    const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
    function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setNewTaskText(event.target.value)

    }

    function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity('Este campo é obrigatório!')
    }

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault()


        setCards([...cards, newTaskText]);

        setCompletedTasks([...completedTasks, false]);

        handleTaskCount()

        setNewTaskText('');

    }

    function deleteCard(taskToDelete: string) {

        const taskIndex = cards.findIndex((card) => card === taskToDelete);

        if (taskIndex !== -1) {
            const tasksWithoutDeletedOne = cards.filter((card) => card !== taskToDelete);

            const updatedCompletedTasks = [...completedTasks];
            updatedCompletedTasks.splice(taskIndex, 1);

            setCards(tasksWithoutDeletedOne);
            setCompletedTasks(updatedCompletedTasks);
            handleTaskCountLess();
        }
    }

    function handleTaskCount() {
        setTaskCount((state) => {
            return state + 1
        });
    }

    function handleTaskCountLess() {
        setTaskCount((state) => {
            return state - 1
        });
    }

    function handleCompleteToggle(index: number) {
        const updatedCompletedTasks = [...completedTasks];
        updatedCompletedTasks[index] = !updatedCompletedTasks[index];
        setCompletedTasks(updatedCompletedTasks);
    }


    const completedTaskCount = completedTasks.filter((completed) => completed).length;

    return (
        <>
            <div>
                <form onSubmit={handleCreateNewTask} className={styles.barForm}>
                    <input
                        className={styles.input}
                        placeholder={"Adicione uma nova tarefa"}
                        value={newTaskText}
                        onChange={handleNewTaskChange}
                        onInvalid={handleNewTaskInvalid}
                        required
                    />
                    <button className={styles.button} type={"submit"} value="Submit">
                        Criar
                        <PlusCircle className={styles.icon} size={15}/>
                    </button>
                </form>
            </div>
            <div className={styles.header}>
                <p className={styles.create}>
                    Tarefas Criadas<span>{taskCount}</span></p>
                <p className={styles.done}>
                    Concluídas<span>{taskCount > 0 ? <p>{completedTaskCount} de {taskCount}</p> : 0}</span></p>
            </div>
            <div>
                {cards.map((card, index) => {
                    return (
                        <ToDoCards
                            key={card}
                            content={card}
                            onDeleteCard={deleteCard}
                            onCompleteToggle={() => handleCompleteToggle(index)}
                            completed={completedTasks[index]}
                        />
                    )
                })}

            </div>

            <div className={taskCount  === 0 ? styles.tasks : styles.tasksNone }>
                <ClipboardText className={styles.clipboard} size={60}/>
                <p>Você ainda não tem tarefas cadastradas </p>
                <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
        </>
    )
}
