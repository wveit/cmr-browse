import { useState } from "react";

export function Tabs({ tabs, children }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const selectedTabIndex = tabs.indexOf(selectedTab);

  return (
    <div>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
      />
      <TabContent selectedTabIndex={selectedTabIndex}>{children}</TabContent>
    </div>
  );
}

function TabBar({ tabs, selectedTab, onTabSelect }) {
  return (
    <div className="TabBar">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={"TabBar__tab" + (tab === selectedTab ? " selected" : "")}
          onClick={() => onTabSelect(tab)}
        >
          {tab}
        </div>
      ))}

      <style jsx>{`
        .TabBar {
          display: flex;
        }
        .TabBar__tab {
          padding: 0 1rem;
          border: 1px solid black;
          cursor: pointer;
        }
        .TabBar__tab:hover {
          border: 1px solid red;
        }
        .TabBar__tab.selected {
          background-color: lightblue;
        }
      `}</style>
    </div>
  );
}

function TabContent({ children, selectedTabIndex }) {
  if (isNaN(selectedTabIndex)) {
    return null;
  }
  return children[selectedTabIndex];
}
