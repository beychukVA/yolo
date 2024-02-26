import { useYoloModal } from 'lib/yoloModals/useYoloModal'
import styled, { css } from 'styled-components'

const Tabs = ({ tabs = [], currentTab, onTabSelected }) => {
  const { updateModal } = useYoloModal()

  const RoiCalculatorModalObj = {
    show: true,
    id: 'roiCalculator',
    backdropClose: false,
    backdropBlurred: false
  }

  const openRoiCalculatorModal = () => {
    updateModal(RoiCalculatorModalObj)
  }
  return (
    <TabsContainer>
      {tabs.map((tab) => (
        <Tab
          className={`${currentTab === tab.id ? 'activeTab' : ''}`}
          key={`${tab.id}${tab.name}`}
          onClick={() => onTabSelected(tab.id)}
        >
          <>
            {tab.name}
            {tab.infoTooltip && (
              <div class='info_asset_icon hint--rounded hint--medium hint--top' data-hint={tab.infoTooltip}></div>
            )}
          </>
        </Tab>
      ))}
      <Tab className='roiCalculator' onClick={() => openRoiCalculatorModal()}>
        ROI CALCULATOR
      </Tab>
    </TabsContainer>
  )
}

export default Tabs

const activeTab = css`
  .activeTab {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    margin-left: -1px;
    color: #b3cbff;
    text-shadow: 0 0 10px rgb(42 109 255);
  }
`

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* overflow-x: auto; */
  /* overflow-y: hidden; */
  white-space: nowrap;

  .roiCalculator {
    margin-left: auto;
  }

  ${activeTab}
`

const Tab = styled.label`
  cursor: pointer;
  padding: 12px 20px 10px 20px;
  margin: 0 2px;
  background: transparent;
  border-bottom: 0;
  display: flex;
  width: fit-content;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    font-weight: 600;
    margin-left: -1px;
    color: #b3cbff;
    text-shadow: 0 0 10px rgb(42 109 255);
  }
`
