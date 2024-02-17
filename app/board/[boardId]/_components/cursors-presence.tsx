
'use client'

import { memo } from 'react';

import { useOthersConnectionIds } from '@/liveblocks.config';
import Cursor from './cursor';

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (<Cursor key={connectionId} connectionId={connectionId} />))}
    </>
  )
}

function CursorsPresence() {
  
  const element = memo(() => (
    <>
      <Cursors />
    </>
  ));

  element.displayName = 'Cursor Presence';

  return element;
}

export default memo(CursorsPresence());
