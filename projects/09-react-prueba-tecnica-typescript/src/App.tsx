import { useState, ChangeEvent, useMemo } from "react";
import UsersList from "./components/UsersList";
import { SortBy, User } from "./types.d";
import useUsers from "./hooks/useUsers";
import "./App.css";
import Theme from "./components/Theme";
import { LoadingIcon } from "./components/Icons";

function App() {
  const [coloredRows, setColoredRows] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [search, setSearch] = useState<string | null>(null);

  const { users, loading, error, deleteUser, setOriginalUsers, loadNextPage } =
    useUsers();

  const toggleColoredRows = () => {
    setColoredRows(!coloredRows);
  };

  const toggleSortedBy = () => {
    //Primero permite que se pueda ordenar por pais, cuando el filtro sea NONE, pero en cuanto cambia, a cual sea remueve los filtros al setear el filtro a NONE
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleSortBy = (filter: SortBy) => {
    setSorting(filter);
  };

  const filteredUsers = useMemo(() => {
    console.log("filter country");
    return typeof search === "string" && search.length > 0
      ? users.filter((user) =>
          user.location.country.toLowerCase().includes(search.toLowerCase()),
        )
      : users;
  }, [search, users]);

  const sortedUsers = useMemo(() => {
    console.log(`Sort by ${sorting}`);

    if (sorting === SortBy.NONE) return filteredUsers;
    else if (sorting === SortBy.NAME)
      return filteredUsers.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first),
      );
    else if (sorting === SortBy.LAST)
      return filteredUsers.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last),
      );
    else if (sorting === SortBy.COUNTRY)
      return filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country),
      );
  }, [filteredUsers, sorting]);

  const handleDelete = (uuid: string) => {
    deleteUser(uuid);
  };

  const handleResetState = () => {
    setOriginalUsers();
  };

  const handleFilterBySearchCountry = (e: ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    if (search === " ") return;
    setSearch(search);
  };

  return (
    <div className="grid place-items-center bg-white dark:bg-slate-900">
      <Theme />

      <h1 className="mb-4 text-3xl font-bold">
        React prueba técnica Typescript
      </h1>

      <header className="grid max-w-[800px] grid-cols-2 justify-between gap-2 sm:grid-cols-3 sm:justify-center md:grid-cols-4 [&>button:hover]:bg-slate-200 dark:[&>button:hover]:bg-slate-700">
        <button
          onClick={toggleColoredRows}
          className="text-dark/80 rounded-full bg-slate-300 px-3 py-1 dark:bg-slate-600 dark:text-white/80 "
        >
          {coloredRows ? "No colorear filas" : "Colorear filas"}
        </button>
        <button
          onClick={toggleSortedBy}
          className="text-dark/80 rounded-full bg-slate-300 px-3 py-1 dark:bg-slate-600 dark:text-white/80"
        >
          {sorting === SortBy.NONE ? "Ordenar por país" : "Quitar filtros"}
        </button>
        <button
          onClick={handleResetState}
          className="text-dark/80 rounded-full bg-slate-300 px-3 py-1 dark:bg-slate-600 dark:text-white/80"
        >
          Resetear estado
        </button>
        <input
          className="rounded-mdbg-slate-200 px-2 py-1 text-black/80 placeholder:italic dark:bg-slate-700 dark:text-white/70"
          placeholder="Filtra por país"
          type="text"
          value={search || ""}
          onChange={handleFilterBySearchCountry}
        />
      </header>

      <main className=" flex w-full flex-col justify-center">
        {users.length > 0 && (
          <UsersList
            users={sortedUsers as User[]}
            coloredRows={coloredRows}
            deleteUser={handleDelete}
            handleSortBy={handleSortBy}
          />
        )}
        {loading && <LoadingIcon />}
        {!loading && error && <p>Ha ocurrido un error</p>}
        {!loading && !error && users.length === 0 && <p>No hay usuarios</p>}

        {!loading && !error && (
          <button
            className="text-dark/80 mt-2 self-center rounded-full bg-slate-300 px-3 py-1 dark:bg-slate-600 dark:text-white/80"
            onClick={loadNextPage}
          >
            Cargar más usuarios
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
