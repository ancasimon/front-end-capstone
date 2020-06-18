import firebase from 'firebase/app';
import 'firebase/auth';

const getUid = () => firebase.auth().currentUser.uid;
const getName = () => firebase.auth().currentUser.displayName;

export default { getUid, getName };
