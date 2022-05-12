import { FC, PropsWithChildren } from 'react'

interface Props {
  onClick: () => void
}

const Move: FC<PropsWithChildren<Props>> = props => (
  <div className='move' onClick={props.onClick}>
    <img alt='close' src='x.svg' />
    {props.children}
  </div>
)

export default Move
