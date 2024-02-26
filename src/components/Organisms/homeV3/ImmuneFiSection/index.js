import { landingAssets } from 'assets/landing'

export const ImmuneFiSection = () => {
  return (
    <div id='immunefi_bug_bounty'>
      <a href='https://immunefi.com/bounty/yolorekt/' target='blank'>
        <div className='immunefi_logo'>
          <img src={landingAssets.immunefi_logo_white} />
        </div>
        <div className='plus'>+</div>
        <div className='yolo_bug_bounty_text'>YOLO Bug Bounty</div>
      </a>
    </div>
  )
}
