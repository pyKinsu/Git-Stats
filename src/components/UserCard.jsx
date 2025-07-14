export default function UserCard({ profile }) {
  return (
    <div className="bg-card text-card-foreground p-6 rounded-xl shadow mb-6 flex flex-col sm:flex-row items-center gap-6">
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="w-24 h-24 rounded-full border border-border"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{profile.name || profile.login}</h2>
        <p className="text-muted-foreground">@{profile.login}</p>
        {profile.bio && <p className="mt-2 text-sm">{profile.bio}</p>}
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          <span>📍 {profile.location || 'Unknown'}</span>
          <span>👥 {profile.followers} followers</span>
          <span>🔁 {profile.following} following</span>
          <span>📦 {profile.public_repos} repos</span>
        </div>
      </div>
    </div>
  );
}
