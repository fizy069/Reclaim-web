import React from 'react'
import Tabs from './Tabs';

function Dashboard() {
  const tabsData = [
    { title: 'Tab 1', value: 'tab1', content: 'Content 1' },
    { title: 'Tab 2', value: 'tab2', content: 'Content 2'},
  ];
  return (

    <div>
      <Tabs tabs={tabsData} />
    </div>
  )
}

export default Dashboard
