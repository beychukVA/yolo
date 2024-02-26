import { ONE_TIME_MODAL } from 'constants/index'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import { useEffect } from 'react'

const INIT_STATE = {
  show: false,
  modalId: ''
}

const oneTimeModalAtom = atomWithStorage(ONE_TIME_MODAL, INIT_STATE)

export const useOneTimeModal = ({ modalId }) => {
  const [state, setState] = useAtom(oneTimeModalAtom)
  const { updateModal } = useYoloModal()

  useEffect(() => {
    if (state.show || state.modalId !== modalId) {
      const oneTimeNew24hrGamesObj = {
        show: true,
        id: modalId,
        backdropClose: false,
        backdropBlurred: false
      }
      updateModal(oneTimeNew24hrGamesObj)
      setState({ show: false, modalId })
    }
  }, [state, setState, modalId])
}
