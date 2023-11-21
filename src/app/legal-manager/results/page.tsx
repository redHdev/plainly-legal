'use client';

import React, { useState, type ReactNode } from 'react';
import defaultItems from './items.json';

//Create an items context
interface ItemContextProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}
const ItemContext = React.createContext<ItemContextProps | undefined>(undefined);
const ItemProvider = ({children}: {children: ReactNode}) => {
    const [items, setItems] = useState<Item[]>(defaultItems as Item[]); // Assuming that default items are an empty array

    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
};

interface Item {
  id: number;
  priority: 'high' | 'medium' | 'normal';
  name: string;
  description: string;
  completed: boolean;
  action?: 'generate_document';
  action_url?: string;
}

function Results() {
  const context = React.useContext(ItemContext);
  if(!context) throw new Error('Item must be used within an ItemProvider');
  const { items } = context;

  function Item({ item }: { item: Item }) {
    const context = React.useContext(ItemContext);
    if(!context) throw new Error('Item must be used within an ItemProvider');
    const { setItems } = context;  

    //Confirm and set Action variables
    const hasAction = item.action && item.action_url;
    const actionText = hasAction && item.action === 'generate_document' ? 'Create now with the generator' : null;
    if(hasAction && !actionText) throw new Error('Action text is not defined');

    function complete(){
      const newItems = [...items];
      const index = newItems.findIndex((i) => i.id === item.id);
    
      if(index === -1) throw new Error('Item not found');
    
      // We're sure that newItems[index] exists
      newItems[index]!.completed = !newItems[index]!.completed;

      setTimeout(() => {
        setItems(newItems);
      }, 400);

    }


    return (
      <div className="pl-audit-item pl-shadow p-5 flex gap-5 auto-cols-max items-start mb-4">
        {!item.completed && (
          <div className="">
            <input type="checkbox" id="item1" name="item1" value="item1" onChange={complete}></input>
          </div>
        )}
        <div className="w-full">
          <div className="w-full mb-3">
            <div className="flex gap-3 auto-cols-max items-center mb-3">
              <svg className="pl-audit-item-flag w-4 h-4" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 28.8191V0H27.5098V28.8191L13.5723 14.8821L0 28.8191Z" /></svg>
              <h3 className="pl-audit-item-title m-0">{item.name}</h3>
            </div>
            <p className="pl-audit-item-text">{item.description}</p>
          </div>
          {hasAction && (
            <div className="w-max">
              <a href={item.action_url} className="btn">
                <span>{actionText}</span>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492.004 492.004" xmlSpace="preserve"> <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" /></svg>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }


  function ItemGroup({ priority, completed = false, items }: { priority?: 'high' | 'medium' | 'normal'; completed?: boolean, items: Item[] }) {
    let itemsToShow = [];
    //Check if we have a priority to filter by
    if (priority) {
      itemsToShow = items.filter(item => item.priority === priority && item.completed === completed);
    } else {
      itemsToShow = items.filter(item => item.completed === completed);
    }

    const status = priority ? priority : completed ? 'completed' : 'normal';

    const headingText = priority === 'high' ? 'High Priority' : priority === 'medium' ? 'Medium Priority' : completed ? 'Completed' : 'Normal Priority';

    //If there's no results, don't show the group
    if (itemsToShow.length === 0) return null;

    //Show the group
    return (
      <div className={`pl-audit-priority pl-audit-priority-${status} mb-12`}>
        <div className={`pl-priority-tag pl-priority-${status}`}>{headingText}</div>

        {itemsToShow.map(item => (
          <Item item={item} key={item.id} />
        ))}

      </div>
    );
  }
    

    


  return (
    <section id="content" className="flex-grow py-0">
      <div className="flex w-full flex-grow flex-col px-3 md:px-6">
        <div className="pl-legal-audit-results mx-auto w-full py-14 text-left">

          <div className="pl-results-header pb-6 mb-12 flex items-center">
            <div className="w-full">
              <h2 className="mb-3">Your Legal Audit Results</h2>
              <div className="label-container mb-5">
                <span id="web_dev_type-label" className="text-center text-lg">Alright! Here are the tasks you need to complete. Let’s check off anything you’ve already done.</span>
                <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed" className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-sm" title="Help">?</button>
              </div>
            </div>
            <div className="w-max">
              <a href="#"><input className="cursor-pointer w-fit" type="submit" value="Update My Audit"></input></a>
            </div>
          </div>

          <div className="pl-audit-items">

            <ItemGroup priority="high" items={items} />
            <ItemGroup priority="medium" items={items} />
            <ItemGroup priority="normal" items={items} />
            <ItemGroup completed items={items} />

          </div>
        </div>
      </div>
    </section>
  );
}


export default function Page() {
  return (
    <ItemProvider>
      <Results />
    </ItemProvider>
  );
}