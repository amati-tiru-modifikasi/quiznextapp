import firebase from "../lib/firebase";

export const addUser = async (authUser: any) => {
    const res = await firebase
        .firestore()
        .collection('users')
        .doc(authUser.uid as string)
        .set({...authUser}, { merge: true });
    return res;
}

export const addQuiz = async (quizData) => {
    let res = await firebase.firestore().collection('quiz').add(quizData);
    return res;
}