import { EditButtonCss } from './EditButtonCss.styled'

export const EditBtn = ({ onClick }) => {
  return (
    <EditButtonCss>
      <button onClick={onClick} class='edit_tpsl'></button>
    </EditButtonCss>
  )
}
