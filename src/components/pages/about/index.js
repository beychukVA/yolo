import React from 'react'
import { NoWalletLayout } from 'components/Layouts/general'
import { PageWrapper } from './cssStyledWrapper'
import { icons } from 'common'

export const AboutPage = () => {
  return (
    <NoWalletLayout>
      <PageWrapper id='page_wrapper'>
        <div id='about-page'>
          <div className='content'>
            <div className='heading'>About Yolorekt</div>
            <p className='emph'>
              Built entirely on the blockchain, Yolorekt is an engaging, fun, social, and potentially lucrative way to
              bid on the future price of crypto. Earn game fees and YOLO rewards by providing in-game liquidity, and
              become a master at bidding above the Strike price.
            </p>
            <div className='overflow_container'>
              <div className='heading_section'>The Core Team</div>
              <p>
                The team at Yolorekt is comprised of a collection of pioneers, leaders, misfits, renegades, bespoke
                experts, ethereum veterans, mathematicians, scientists, artists, musicians, engineers, designers, and
                the assemblage of talent beyond words; not to mention a former VP of Engineering at MySpace and founders
                of Spankchain.
              </p>
              <div className='team_wrapper'>
                <ul className='team'>
                  <li className='name'>
                    <span>Yogesh Srihari</span> Co-founder, CEO
                  </li>
                  <li> Jack of All Trades, Algorithms, Web3, Tennis, and Marvel Movies</li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Garen Vartanian</span> Co-founder
                  </li>
                  <li>Ph.D., Quantish, dreams in contracts, loves DeFi, Pizza, and Pine Trees</li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Ioan-Andrei Batinas</span> Senior Backend Engineer
                  </li>
                  <li>
                    Business in the front, party in the back. Ex-kickboxer, Star Wars superfan, dancing Web3 guru.
                  </li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Andres Cortes</span> Lead Software and web3 Engineer
                  </li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Tino</span> Lead Designer &amp; Creative Director
                  </li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Rajesh Uppala</span> Quantitative Researcher
                  </li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Shant</span> Backend Architect
                  </li>
                  <li>Former VP of Tech at MySpace</li>
                </ul>
                <ul className='team'>
                  <li className='name'>
                    <span>Sohail Shaikh</span> Social Media and Marketing
                  </li>
                  <li>
                    Marketing Ninja. Web3 Writer. Degen AF. Poker player. Loves reading sci-fi and watch dystopian
                    movies.
                  </li>
                </ul>
              </div>

              <div className='heading_section'>Partnerships</div>
              <div className='partnerships_wrapper'>
                <a href='https://polygon.technology' target='blank' className='polygon_logo'>
                  <img alt='' src={icons.PolygonLogoIcon} />
                </a>
                <a href='https://galaxy.eco' target='blank' className='galaxy_logo'>
                  <img alt='' src={icons.ProjectGalaxyLogo} />
                </a>
                <a href='https://unstoppabledomains.com' target='blank' className='ud_logo'>
                  <img alt='' src={icons.UnstoppableDomainsLogo} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </NoWalletLayout>
  )
}
