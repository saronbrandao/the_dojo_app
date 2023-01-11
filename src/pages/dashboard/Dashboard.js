import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useCollection } from '../../hooks/useCollection';

// styles
import './Dashboard.css';

const Dashboard = () => {
  const { documents, error } = useCollection('projects');

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && <ProjectFilter />}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
};

export default Dashboard;
