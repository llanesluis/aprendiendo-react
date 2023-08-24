import { useEffect, useRef, useState } from "react";
import { User } from "../types";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  //Fetching the users from the API
  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(
      `https://randomuser.me/api?results=10&seed=midudev&page=${currentPage}`,
    )
      .then(async (res) => {
        if (!res.ok) throw new Error("Error en la petición");
        return await res.json();
      })
      .then((res) => {
        originalUsers.current = originalUsers.current.concat(res.results);

        setUsers((prevUsers) => {
          const newUsers = prevUsers.concat(res.results);
          return newUsers;
        });
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const deleteUser = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid);

    if (!filteredUsers) return;
    setUsers(filteredUsers);
  };

  const setOriginalUsers = () => {
    setUsers(originalUsers.current);
  };

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return { users, deleteUser, setOriginalUsers, loading, error, loadNextPage };
}
