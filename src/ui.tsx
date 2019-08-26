import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import "@atlaskit/css-reset";

import { html as io } from './lib/io';
import useSelection from './hooks/use-selection';
import actionsData from './lib/actions-data';

import Action from './components/action';
import ActionButton from './components/action-button';
import ActionsList from './components/actions-list';
import App from './components/app';
import Automation from './components/automation';
import Nav from './components/nav';
import NavButton from './components/nav-button';

import Icon from '@mdi/react';
import { mdiPlay, mdiCheck } from '@mdi/js';

const { useState, useEffect } = React;

const PluginUI = () => {
  const [automation, setAutomation] = useState(actionsData.automation);
  const { actions } = actionsData;
  const actionsArray = Object.keys(actions).map(actionId => actions[actionId]);

  const selection = useSelection();

  const { length } = selection;


  const onDragEnd = (result) => {
    // const { destination, source, draggableId  } = result;

    // if(!destination) {
    //   return;
    // }

    // if(
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
  }

  const addAction = (action) => () => {
    setAutomation([...automation, action.id]);
  }

  const runAutomation = () => {
    io.send("run", automation);
  }

  return (
    <div>
      <Nav>
        <NavButton onClick={runAutomation}>
          <Icon size={1} path={mdiPlay} color="white" />
        </NavButton>
        <NavButton onClick={() => {}}>
          Save
        </NavButton>
      </Nav>
      <App>
        <DragDropContext onDragEnd={onDragEnd}>
          <Automation>
            {automation.map((id, index) => (
              <Action key={`${id}-${index}`} actionId={id} index={index}>
                {actions[id].name} id: {id} ix: {index}
              </Action>
            ))}
          </Automation>
          <ActionsList>
            {actionsArray.map(action => (
              <ActionButton key={action.id} onClick={addAction(action)}>
                {action.name}
              </ActionButton>
            ))}
          </ActionsList>
        </DragDropContext>
      </App>
    </div>
  );
}

ReactDOM.render(<PluginUI />, document.getElementById('react-page'))