import {createPollOptionApi, getPollApi, pollVoteApi, resetDataApi, useGetPollApi} from "./poll";
import {pollInitialData} from "../data/poll";
import {fromJS} from "immutable";
import {act, renderHook} from "@testing-library/react-hooks"

const pollInitalDataImmutable = fromJS(pollInitialData)

describe('poll api', () => {
  beforeEach(() => {
    resetDataApi()
  })

  it('getPollApi returns initial data', () => {
    const poll = getPollApi()
    expect(poll).toEqual(pollInitalDataImmutable)
  })

  it('useGetPollApi returns initial data', () => {
    const {
      result,
    } = renderHook(() => useGetPollApi())
    expect(result.current.data).toEqual(pollInitalDataImmutable)
  })

  it('useGetPollApi returns updated data after calling refresh', () => {
    const {
      result,
    } = renderHook(() => useGetPollApi())
    expect(result.current.data).toEqual(pollInitalDataImmutable)

    pollVoteApi({ optionIds: ['test'] })
    expect(result.current.data).toEqual(pollInitalDataImmutable)

    act(() => result.current.refresh())
    expect(result.current.data).toEqual(pollInitalDataImmutable.set('myVotes', fromJS(['test'])))
  })

  it('pollVoteApi updates myVotes', () => {
    expect(getPollApi()).toEqual(pollInitalDataImmutable)

    pollVoteApi({ optionIds: ['test', 'test2'] })
    expect(getPollApi()).toEqual(pollInitalDataImmutable.set('myVotes', fromJS(['test', 'test2'])))
  })

  it('pollVoteApi updates myVotes', () => {
    expect(getPollApi()).toEqual(pollInitalDataImmutable)

    pollVoteApi({ optionIds: ['test', 'test2'] })
    expect(getPollApi()).toEqual(pollInitalDataImmutable.set('myVotes', fromJS(['test', 'test2'])))
  })

  it('pollVoteApi updates votesCount', () => {
    expect(getPollApi()).toEqual(pollInitalDataImmutable)

    pollVoteApi({ optionIds: ['c18bab54-1c03-40b2-876e-d963840716c4', 'b69ca6ad-a560-40e3-b7b8-670d293e4c2c'] })
    expect(getPollApi().get('pollOptions')).toEqual(fromJS([
      {
        id: 'c18bab54-1c03-40b2-876e-d963840716c4',
        order: 0,
        message: 'Conchiglie',
        votesCount: 3,
        createdAt: '2020-10-07T11:49:34.471Z'
      },
      {
        id: 'b69ca6ad-a560-40e3-b7b8-670d293e4c2c',
        order: 1,
        message: 'Fusili',
        votesCount: 1,
        createdAt: '2020-10-07T11:49:34.473Z'
      },
      {
        id: 'cc855c60-40b9-4fe5-a481-b84fce325744',
        order: 2,
        message: 'Farfalle',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.475Z'
      },
      {
        id: '8bb3bf89-a40a-429b-ac7a-8f60fc991d6b',
        order: 3,
        message: 'Linguine',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.477Z'
      },
      {
        id: '5d4082a2-4a7f-4230-bbcd-70f37c2c1bae',
        order: 4,
        message: 'Spaghetti',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.479Z'
      },
      {
        id: '29f119ce-5dc6-4070-bfac-4a88cdcf8bbf',
        order: 5,
        message: 'Gnocchi',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.481Z'
      },
      {
        id: 'c45afdba-5a2b-4686-b017-9b0297ad4eae',
        order: 6,
        message: 'Rigatoni',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.483Z'
      }
    ]))

    pollVoteApi({ optionIds: ['b69ca6ad-a560-40e3-b7b8-670d293e4c2c'] })
    expect(getPollApi().get('pollOptions')).toEqual(fromJS([
      {
        id: 'c18bab54-1c03-40b2-876e-d963840716c4',
        order: 0,
        message: 'Conchiglie',
        votesCount: 2,
        createdAt: '2020-10-07T11:49:34.471Z'
      },
      {
        id: 'b69ca6ad-a560-40e3-b7b8-670d293e4c2c',
        order: 1,
        message: 'Fusili',
        votesCount: 1,
        createdAt: '2020-10-07T11:49:34.473Z'
      },
      {
        id: 'cc855c60-40b9-4fe5-a481-b84fce325744',
        order: 2,
        message: 'Farfalle',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.475Z'
      },
      {
        id: '8bb3bf89-a40a-429b-ac7a-8f60fc991d6b',
        order: 3,
        message: 'Linguine',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.477Z'
      },
      {
        id: '5d4082a2-4a7f-4230-bbcd-70f37c2c1bae',
        order: 4,
        message: 'Spaghetti',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.479Z'
      },
      {
        id: '29f119ce-5dc6-4070-bfac-4a88cdcf8bbf',
        order: 5,
        message: 'Gnocchi',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.481Z'
      },
      {
        id: 'c45afdba-5a2b-4686-b017-9b0297ad4eae',
        order: 6,
        message: 'Rigatoni',
        votesCount: 0,
        createdAt: '2020-10-07T11:49:34.483Z'
      }
    ]))
  })

  it('createPollOptionApi creates an option', () => {
    expect(getPollApi()).toEqual(pollInitalDataImmutable)
    expect(getPollApi().get('pollOptions').size).toBe(7)

    createPollOptionApi({ message: 'option-test-1' })
    const updatedPoll = getPollApi()
    expect(updatedPoll.delete('pollOptions')).toEqual(pollInitalDataImmutable.delete('pollOptions'))
    expect(updatedPoll.get('pollOptions').size).toBe(8)
    expect(updatedPoll.get('pollOptions').take(7)).toEqual(pollInitalDataImmutable.get('pollOptions').take(7))
    expect(updatedPoll.get('pollOptions').last().get('message')).toBe('option-test-1')
  })

  it('createPollOptionApi creates multiple options', () => {
    expect(getPollApi()).toEqual(pollInitalDataImmutable)
    expect(getPollApi().get('pollOptions').size).toBe(7)

    createPollOptionApi({ message: 'option-test-1' })
    createPollOptionApi({ message: 'option-test-2' })
    const updatedPoll = getPollApi()
    expect(updatedPoll.delete('pollOptions')).toEqual(pollInitalDataImmutable.delete('pollOptions'))
    expect(updatedPoll.get('pollOptions').size).toBe(9)
    expect(updatedPoll.get('pollOptions').take(7)).toEqual(pollInitalDataImmutable.get('pollOptions').take(7))
    expect(updatedPoll.get('pollOptions').get(7).get('message')).toBe('option-test-1')
    expect(updatedPoll.get('pollOptions').get(8).get('message')).toBe('option-test-2')
  })
})
