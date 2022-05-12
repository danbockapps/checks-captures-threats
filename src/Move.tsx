import { FC, PropsWithChildren } from 'react'

const Move: FC<PropsWithChildren<{}>> = props => <div className='move'>{props.children}</div>

export default Move
