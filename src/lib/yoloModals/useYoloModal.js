import { atom, useAtomValue, useSetAtom } from 'jotai'

const MODAL_STATE_INIT = {
  show: false,
  locked: false,
  id: null,
  priority: 5, // lower number more priority
  props: {},
  backdropClose: true,
  backdropBlurred: true
}

const modalStateAtom = atom(MODAL_STATE_INIT)

const updateModalStateAtom = atom(null, (get, set, modalObj) => {
  set(modalStateAtom, (prev) => {
    const incomingPriority = modalObj.priority || prev.priority
    const actualPriority = prev.priority
    if (incomingPriority <= actualPriority) {
      return { ...prev, ...modalObj }
    }
    return prev
  })
})

const clearStateModalAtom = atom(null, (get, set, modalId) => {
  set(modalStateAtom, (prev) => {
    if (prev.priority > 0 && modalId === 'all') {
      return MODAL_STATE_INIT
    }
    if (modalId === prev.id) {
      return MODAL_STATE_INIT
    }
    return prev
  })
})

export const useYoloModal = () => {
  const modalState = useAtomValue(modalStateAtom)
  const updateModal = useSetAtom(updateModalStateAtom)
  const clearModal = useSetAtom(clearStateModalAtom)
  return { modalState, updateModal, clearModal }
}
