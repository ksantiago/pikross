import * as firebase from 'firebase'

import { firebaseConfig } from '../config/keys'
firebase.initializeApp(firebaseConfig)

export const ref = firebase.database().ref('restricted_access/secret_document')
// export const solutionsRef = ref.child('solutions')

