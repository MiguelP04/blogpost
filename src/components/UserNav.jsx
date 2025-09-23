import React from "react";
import { useUserData } from "../hooks/useUserData";

export default function UserNav({ selectedSection, setSelectedSection }) {
  const { user } = useUserData();

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).slice(0,2).join("") : "U";

  return (
    <aside className="w-64 bg-white shadow rounded-r-lg p-4 hidden md:block">
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3">
          {initials}
        </div>

        <nav className="w-full">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedSection("profile")}
                className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-3 ${selectedSection === "profile" ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
                aria-current={selectedSection === "profile" ? "page" : undefined}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-white/20">👤</span>
                <span>Perfil</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setSelectedSection("posts")}
                className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-3 ${selectedSection === "posts" ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
                aria-current={selectedSection === "posts" ? "page" : undefined}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-white/20">📝</span>
                <span>Posts</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => setSelectedSection("albums")}
                className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-3 ${selectedSection === "albums" ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50"}`}
                aria-current={selectedSection === "albums" ? "page" : undefined}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded bg-white/20">📷</span>
                <span>Álbumes</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
