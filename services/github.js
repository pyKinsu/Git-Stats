import axios from 'axios';

export const fetchUserRepos = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
  return res.data;
};
