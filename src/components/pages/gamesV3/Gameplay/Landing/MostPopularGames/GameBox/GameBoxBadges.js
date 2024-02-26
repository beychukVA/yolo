import styled from 'styled-components'

export const GameBoxBadges = () => {
  return (
    <BadgesWrapper className='product_hunt_features'>
      <a
        className='ph_badge'
        href='https://www.producthunt.com/posts/yolorekt-future?utm_source=badge-top-post-topic-badge&amp;utm_medium=badge&amp;utm_souce=badge-yolorekt-future'
        target='_blank'
        rel='noreferrer noopener'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=375620&amp;theme=light&amp;period=weekly&amp;topic_id=501'
          alt='YOLORELT FUTURE$ - A new leveraged trading experience from the future | Product Hunt'
          style={{ width: '250px', height: '54px' }}
          width='250'
          height='54'
        />
      </a>

      <a
        className='ph_badge'
        href='https://www.producthunt.com/posts/yolorekt-future?utm_source=badge-featured&amp;utm_medium=badge&amp;utm_souce=badge-yolorekt-future'
        target='_blank'
        rel='noreferrer noopener'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=375620&amp;theme=light'
          alt='YOLOREKT FUTURE$ - A new leveraged trading experience from the future | Product Hunt'
          style={{ width: '250px', height: '54px' }}
          width='250'
          height='54'
        />
      </a>

      <a
        className='ph_badge'
        href='https://www.producthunt.com/posts/yolorekt-future?utm_source=badge-top-post-topic-badge&amp;utm_medium=badge&amp;utm_souce=badge-yolorekt-future'
        target='_blank'
        rel='noreferrer noopener'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/top-post-topic-badge.svg?post_id=375620&amp;theme=light&amp;period=weekly&amp;topic_id=94'
          alt='Yolorekt Future$ - A new leveraged trading experience from the future | Product Hunt'
          style={{ width: '250px', height: '54px' }}
          width='250'
          height='54'
        />
      </a>
    </BadgesWrapper>
  )
}

const BadgesWrapper = styled.div`
  /*! CSS Used from: http://yolo.tino.me/app_v3/resources/css/landing.css */
  &.product_hunt_features {
    width: 100%;
    margin: 10px 0 30px 0;
    border-top: 0;
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  a.ph_badge {
    margin: 0 5px 0 0;
    align-self: center;
    justify-self: center;
    display: flex;
  }
  a.ph_badge img {
    filter: invert(1) hue-rotate(61deg);
  }
`
