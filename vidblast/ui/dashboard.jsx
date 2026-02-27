export default function Dashboard(){
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">VidBlast MVP Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded p-4">Blasts Remaining: 5</div>
          <div className="bg-gray-800 rounded p-4">Status: Healthy</div>
          <div className="bg-gray-800 rounded p-4">Upgrades: Free | Pro</div>
        </div>
        <div className="mt-6 bg-gray-800 rounded p-6">
          <h2 className="text-xl font-semibold mb-2">Recent Uploads</h2>
          <div className="h-40 bg-black/20 rounded" aria-label="preview area"/>
        </div>
      </div>
    </div>
  );
}
