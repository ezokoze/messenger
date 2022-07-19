import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "./firebase";

const saveMessage = async (userId: any, messageText: string, sentAt: Date, currentGroupId: any) => {
    if (messageText.trim()) {
        const message = {
            messageText,
            sentAt,
            sentBy: userId,
        }

        try {
            const messageRef = collection(db, 'message');
            const document = doc(messageRef, '/' + currentGroupId);
            const documentRef = collection(document, 'messages');
            await addDoc(documentRef, message);

        } catch (err: any) {
            console.error('err', err);
        }
    }
}

export {
    saveMessage
};