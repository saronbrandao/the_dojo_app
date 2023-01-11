import { useState } from 'react';
const filterList = [
  'all',
  'mine',
  'development',
  'design',
  'merketing',
  'sales',
];

const ProjectFilter = () => {
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleClick = (newFilter) => {
    console.log(newFilter);
    setCurrentFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map((f) => (
          <button
            className={currentFilter === f ? 'active' : ''}
            key={f}
            onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
