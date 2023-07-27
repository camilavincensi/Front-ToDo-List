import styles from './ToDoCards.module.css'
import { CheckCircle, Circle, Trash} from "phosphor-react";


interface CardsProps {
    content: string;
    onDeleteCard: (card: string) => void;
    onCompleteToggle: () => void; // Callback for toggling completion state
    completed: boolean;
}
export function ToDoCards ({content, onDeleteCard, completed, onCompleteToggle}: CardsProps) {

    function handleDeleteCard() {
        onDeleteCard(content)
    }

    return (
        <div className={!completed ? styles.card: styles.cardDone}>
            <div className={styles.content}>
                <button
                    onClick={onCompleteToggle}
                >
                    {!completed ? ( <Circle size={25} />) : (<CheckCircle className={styles.check} weight="fill" size={25} />)}
                </button>
                <p className={completed ? styles.done: ''}>
                    {content}
                </p>
            </div>
               <button onClick={handleDeleteCard} className={styles.trash}>
                   <Trash size={26}/>
               </button>
        </div>
    )
}
