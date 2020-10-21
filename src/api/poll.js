import {pollInitialData} from "../data/poll";
import {useCallback, useState} from "react";
import {fromJS, Map} from "immutable";

const LOCAL_STORAGE_KEY = 'poll'

/*
  Simple poll getter API. Run this function to get the current poll data.
 */
export const getPollApi = () => {
  return fromJS(getPollFromLocalStorage() ?? pollInitialData)
}

/*
  Poll getter hook. Using this hook will get you the current poll data in the data key in the returned object.
  Running the refresh function will re-fetch the poll from the "API" and return it once again in the data key.
 */
export const useGetPollApi = () => {
  const [data, setData] = useState(getPollApi)

  const refresh = useCallback(() => {
    setData(getPollApi())
  }, [setData])

  return { data, refresh }
}

/*
  Pass a message body for the new option and this function creates the option and saves it on the server.
  The created option object is returned.
 */
export const createPollOptionApi = ({ message }) => {
  const poll = getPollApi()
  const option = Map({
    id: generateUUID(),
    message,
    votesCount: 0,
    createdAt: (new Date()).toISOString(),
  })

  savePollToLocalStorage(poll.update('pollOptions', (options) => options.push(option)))
  return option
}

/*
  This function performs voting.
  Pass a JS array containing all the options the user wants to vote for.
  Any previous votes will be deleted in favour of the new list of options voted for.
  The whole poll object is returned.
*/
export const pollVoteApi = ({ optionIds }) => {
  let poll = getPollApi()
  const previousMyVotes = poll.get('myVotes')
  poll = poll.update('pollOptions', (options) => {
    return options.map((option) => {
      const selectedBefore = previousMyVotes.includes(option.get('id')) ? -1 : 0
      const selectedAfter = optionIds.includes(option.get('id')) ? 1 : 0

      return option.update('votesCount', (votesCount) => votesCount + selectedBefore + selectedAfter)
    })
  })
  poll = poll.set('myVotes', fromJS(optionIds))

  savePollToLocalStorage(poll)
  return poll
}

/*
  Resets data on the API server.
  Note: after performing this action, data is returned to the initial state.
  All data must be re-fetched to reflect the changes in your UI.
 */
export const resetDataApi = () => {
  localStorage.clear()
}

// Helpers
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const getPollFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
}

const savePollToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data.toJS()))
}
