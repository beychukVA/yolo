import { landingAssets } from 'assets/landing'

export const ExperienceShots = () => {
  return (
    <>
      <div id='level_2'>
        <div className='content'>
          <div className='app_experiences'>
            <h4>The Pro and Mobile Experiences</h4>
            <h5>Lots of money to be won - lots of fun to be had</h5>
            <div className='tpe'>
              <img alt='tpe' src={landingAssets.tpe_lp} />
            </div>
            <div className='tme'>
              <img alt='tme' src={landingAssets.tme_lp} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
