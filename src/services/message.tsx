import { addDoc, collection, doc, limit, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const saveMessage = async (userId: any, sentAt: Date, currentGroupId: any, messageText: string, mediaUrl: string) => {

    if (messageText.trim() || mediaUrl.trim()) {
        const message = {
            messageText,
            sentAt,
            sentBy: userId,
            mediaUrl: mediaUrl
        }

        try {
            const messageRef = collection(db, 'message');
            const document = doc(messageRef, '/' + currentGroupId);
            const documentRef = collection(document, 'messages');
            await addDoc(documentRef, message);

            // update recent message in conversation object
            updateRecentMessage(currentGroupId, message);

        } catch (err: any) {
            console.error('err', err);
        }
    }
}

const updateRecentMessage = (conversationId: string, message: object) => {
    const conversationRef = collection(db, 'group');
    const conversationDoc = doc(conversationRef, conversationId);
    updateDoc(conversationDoc, { recentMessage: message });
};

const getMessageByConversationId = async (conversationId: string) => {
    const conversationsCollection = await collection(db, `message`);
    const conversationDocument = doc(conversationsCollection, conversationId);
    const messagesCollection = await collection(conversationDocument, 'messages');
    const queryMessages = query(messagesCollection, limit(10), orderBy('sentAt', 'desc'));
    return queryMessages;
};

export {
    saveMessage,
    getMessageByConversationId
};
