export function setTopics(state, payload) {
  state.topics = payload
}

export function setTopic(state, payload) {
  state.topic = payload
}

export function setCurrentUser(state, payload) {
  if (!payload) {
    state.currentUser = null
  } else {
    const { id, email, username } = payload
    state.currentUser = {
      id,
      email,
      username,
    }
  }
}

export const setAuthLoading = (state, payload) => (state.authLoading = payload)

export const setTopicsLoading = (state, payload) =>
  (state.topicsLoading = payload)

export const setTopicLoading = (state, payload) =>
  (state.topicLoading = payload)

export const setDiscussionsLoading = (state, payload) =>
  (state.discussionsLoading = payload)

export const setDiscussions = (state, payload) => (state.discussions = payload)
