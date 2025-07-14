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
      const [user, repos] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username)
      ]);
      setProfile(user);
      setRepos(repos);
      setFilteredRepos(repos);
    };
    fetchData();
  }, [username]);

  return (
    <main className="flex-1 p-4">
      {profile && <UserCard profile={profile} />}
      <ContributionCalendar username={username} />
      <RepoSortFilter repos={repos} onChange={setFilteredRepos} />
      <Charts repos={filteredRepos} />
      <StatGalaxy repos={filteredRepos} />
    </main>
  );
}
