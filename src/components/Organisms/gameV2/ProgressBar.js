import styled from 'styled-components'

export const ProgressBar = ({ progress = 0, topOffset = 0 }) => {
  return (
    <Container topOffset={topOffset}>
      <Filler progress={progress} />
    </Container>
  )
}

const Container = styled.div`
  width: calc(100%-10px);
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin: 15px 0px 0 0px;
  transform: ${({ topOffset }) => `translate(0, ${topOffset}px)`};
`
const Filler = styled.div.attrs((props) => ({
  style: {
    width: `${props.progress}%`
  }
}))`
  height: 100%;
  background: #fff;
  border-radius: 10px;
  text-align: right;

  /* height: 5px; */
  /* position: absolute;
  left: 0;
  top: 0; */
`
