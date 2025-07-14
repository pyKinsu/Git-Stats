import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchUserProfile,
  fetchUserRepos
} from '../services/github';
import UserCard from '../components/UserCard';
import Charts from '../components/Charts';
import StatGalaxy from '../components/StatGalaxy';
import ContributionCalendar from '../components/ContributionCalendar';
import RepoSortFilter from '../components/RepoSortFilter';

export default function UserPage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, repoData] = await Promise.all([
          fetchUserProfile(username),
          fetchUserRepos(username)
        ]);
        setProfile(userData);
        setRepos(repoData);
        setFilteredRepos(repoData);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      {profile && <UserCard profile={profile} />}
      <ContributionCalendar username={username} />
      <RepoSortFilter repos={repos} onChange={setFilteredRepos} />
      <Charts repos={filteredRepos} />
      <StatGalaxy repos={filteredRepos} />
    </div>
  );
}
