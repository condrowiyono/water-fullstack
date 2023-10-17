type TabProps = {
  tabs: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
};

const Tab = ({ tabs, value, onChange }: TabProps) => {
  return (
    <div className="max-w-4xl flex justify-center mx-auto">
      <div className="tabs tabs-boxed">
        {tabs.map((tab) => (
          <a
            key={tab.value}
            className={`tab ${value === tab.value ? "tab-active" : ""} transition-colors duration-200`}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tab;
