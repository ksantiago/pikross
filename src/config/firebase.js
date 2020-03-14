import * as firebase from 'firebase'

import { firebaseConfig } from '../config/keys'
firebase.initializeApp(firebaseConfig)

const ref = firebase.database().ref('restrictd_access/secret_document')
export const solutionsRef = ref.child('solutions')
