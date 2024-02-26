import { ChartSelectorCss } from './ChartSelectorCss.styled'

export const ChartSelector = ({ options, selectedOption, onSelect }) => {
  return (
    <ChartSelectorCss>
      <div className='leaderboard_menus'>
        <div className='filter_by_time'>
          <div className='select-box'>
            <div className='select-box__current' tabindex='1'>
              {options.map((option, idx) => (
                <div key={`option-${idx}`} className='select-box__value'>
                  <input
                    className='select-box__input'
                    type='radio'
                    id={idx}
                    value={idx}
                    name='time_option'
                    checked={option.id === selectedOption.id}
                  />
                  <p className='select-box__input-text'>{option.caption}</p>
                </div>
              ))}

              <div className='menu_select'></div>
            </div>
            <ul className='select-box__list'>
              {options.map((option, idx) => (
                <li onClick={() => onSelect(option)} className={option.id === selectedOption.id ? 'highlight' : ''}>
                  <label className='select-box__option' htmlFor={idx}>
                    {option.caption}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='new_badge'>NEW</div>
      </div>
    </ChartSelectorCss>
  )
}
