import { firestore, firebaseAuth } from "boot/firebase"

export async function loadTopics({ commit }) {
  commit("setTopicsLoading", true)
  firestore
    .collection("topics")
    .get()
    .then((querySnapshot) => {
      let topics = {}
      querySnapshot.forEach((doc) => {
        topics[doc.id] = doc.data()
      })
      commit("setTopics", topics)
      commit("setTopicsLoading", false)
    })
    .catch((error) => {
      console.error("Error getting document: ", error)
      commit("setTopicsLoading", false)
    })
}

export async function loadTopic({ commit }, topicId) {
  commit("setTopicLoading", true)
  try {
    const topic = await firestore.doc(`topics/${topicId}`).get()
    commit("setTopic", {
      id: topicId,
      ...topic.data(),
    })
    commit("setTopicLoading", false)
  } catch (err) {
    commit("setTopicLoading", false)
    throw new Error(err)
  }
}

export async function loadDiscussions({ commit }, topicId) {
  commit("setDiscussionsLoading", true)
  try {
    const discussions = await firestore
      .collection(`topics/${topicId}/discussions`)
      .get()
    console.log(
      "discussions:",
      discussions.docs.map((discussion) => discussion.data())
    )
    commit(
      "setDiscussions",
      discussions.docs.map((discussion) => discussion.data())
    )
    commit("setDiscussionsLoading", false)
  } catch (err) {
    commit("setDiscussionsLoading", false)
    throw new Error(err)
  }
}

export function registerUser({ commit }, payload) {
  commit("setAuthLoading", true)
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then((response) => {
      commit("setAuthLoading", false)
      let userId = firebaseAuth.currentUser.uid
      firestore.collection("users").doc(userId).set({
        username: payload.username,
        email: payload.email,
      })
    })
    .catch((error) => {
      commit("setAuthLoading", false)
      console.log(error.message)
    })
}

export function loginUser({ commit }, payload) {
  commit("setAuthLoading", true)
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then((response) => {
      commit("setAuthLoading", false)
    })
    .catch((error) => {
      commit("setAuthLoading", false)
      console.log(error.message)
    })
}

export function loadCurrentUser({ commit }) {
  commit("setAuthLoading", true)
  firebaseAuth.onAuthStateChanged(async (user) => {
    if (user) {
      const currentUser = await firestore.doc(`users/${user.uid}`).get()
      commit("setCurrentUser", {
        id: user.uid,
        ...currentUser.data(),
      })
      commit("setAuthLoading", false)
    }
    commit("setAuthLoading", false)
  })
}

export function logoutUser({ commit }) {
  commit("setAuthLoading", true)
  firebaseAuth.signOut()
  commit("setCurrentUser", null)
  commit("setAuthLoading", false)
}
