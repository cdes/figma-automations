import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import "@atlaskit/css-reset";

import { html as io } from './io';
import actions from './actions';

import Action from './components/action';
import ActionButton from './components/action-button';
import ActionsList from './components/actions-list';
import App from './components/app';
import Automation from './components/automation';
import Nav from './components/nav';
import NavButton from './components/nav-button';

import Icon from '@mdi/react';
import { mdiPlay, mdiCheck } from '@mdi/js';

const { useState, useReducer, useCallback } = React;

import { v4 as uuid } from 'uuid';
import * as randomcolor from "random-color";

import { reducer, Context } from "./store";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const PluginUI: React.FC = () => {
  const [automation, setAutomation] = useState([]);

  const [store, dispatch] = useReducer(reducer, {});  

  const onDragEnd = (result) => {    
    const { destination, source  } = result;

    // drop outside
    if(!destination) {
      return;
    }

    // drop in the same position
    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = reorder(
      automation,
      source.index,
      destination.index
    );

    setAutomation(items);
  }

  const addAction = (action) => () => {        
    setAutomation([...automation, {
      id: uuid(),
      action,
      color: randomcolor(0.3, 0.7).hexString()
    }]);
  }

  const runAutomation = () => {
    io.send("run", automation);
  }

  return (
    <Context.Provider value={{ store, dispatch }}>
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
            {automation.map((ActionObject, index) => (
              <Action key={ActionObject.id} index={index} draggableId={ActionObject.id}>
                <ActionObject.action id={ActionObject.id} dispatch={dispatch} index={index} color={ActionObject.color} />
              </Action>
            ))}
          </Automation>
          <ActionsList>
            {actions.map(action => (
              <ActionButton key={action.name} onClick={addAction(action)}>
                {action.name.replace(/([A-Z])/g, ' $1').trim()}
              </ActionButton>
            ))}
          </ActionsList>
        </DragDropContext>
      </App>
    </Context.Provider>
  );
}

ReactDOM.render(<PluginUI />, document.getElementById('react-page'))