import { FC, PropsWithChildren } from 'react'

const Move: FC<PropsWithChildren<{}>> = props => (
  <div className='move'>
    <img src='x.svg' />
    {props.children}
  </div>
)

export default Move
