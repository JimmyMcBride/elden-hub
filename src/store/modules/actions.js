import { firestore } from "boot/firebase"

export async function loadTopics({ commit }) {
  firestore
    .collection("topics")
    .get()
    .then((querySnapshot) => {
      let topics = {}
      querySnapshot.forEach((doc) => {
        topics[doc.id] = doc.data()
      })
      commit("setTopics", topics)
    })
    .catch((error) => {
      console.error("Error getting document: ", error)
    })
}
