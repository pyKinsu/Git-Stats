const GITHUB_API = 'https://api.github.com';

export async function fetchUserProfile(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return await res.json();
}

export async function fetchUserRepos(username) {
  const res = await fetch(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return await res.json();
}
