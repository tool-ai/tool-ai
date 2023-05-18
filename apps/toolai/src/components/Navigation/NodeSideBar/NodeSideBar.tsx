import React, {useState} from 'react';
import NodeItemSideBar from '../NodeItemSideBar/NodeItemSideBar';
import { SettingsDialog } from '@tool-ai/ui';
import { NodeData, groups } from '../../../nodeData';


const NodeSideBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='flex absolute z-10 h-min top-20 left-2.5 group'>
    <aside className={`px-2 py-2.5 max-h-[80vh] overflow-y-scroll rounded-md bg-white shadow-md w-[50px] overflow-x-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    <SettingsDialog />
    {NodeData.map(nodeItem => {
      return <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, nodeItem.type)} title={nodeItem.label} icon={nodeItem.icon} group={nodeItem.group} />
    })}

    </aside>

</div>
  );
};

export default NodeSideBar;
