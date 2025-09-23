export default function UserProfile({ user }) {
  if (!user)
    return (
      <div className="max-w-3xl mx-auto text-center mt-8">
        <p>Cargando perfil...</p>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-6">
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
          {user.name.split(" ")[0][0]}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-indigo-700">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.company?.catchPhrase}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="text-sm text-indigo-600 hover:underline" href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm text-gray-500">Teléfono</h3>
          <p className="font-medium">{user.phone}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm text-gray-500">Dirección</h3>
          <p className="font-medium">{user.address.street}, {user.address.city}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm text-gray-500">Compañía</h3>
        <p className="font-medium">{user.company.name}</p>
        <p className="text-sm text-gray-600 mt-1">{user.company.bs}</p>
      </div>
    </div>
  );
}
