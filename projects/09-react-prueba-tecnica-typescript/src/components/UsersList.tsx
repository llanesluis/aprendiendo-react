import { SortBy, User } from "../types.d";

interface Props {
  users: User[];
  coloredRows: boolean;
  deleteUser: (uuid: string) => void;
  handleSortBy: (filter: SortBy) => void;
}

const UsersList = ({ users, coloredRows, deleteUser, handleSortBy }: Props) => {
  return (
    <table className="table">
      <thead className=" h-12 text-lg hover:[&_th.pointer]:text-blue-800 dark:hover:[&_th.pointer]:text-blue-300">
        <tr>
          <th>Foto</th>
          <th onClick={() => handleSortBy(SortBy.NAME)} className="pointer">
            Nombre
          </th>
          <th onClick={() => handleSortBy(SortBy.LAST)} className="pointer">
            Apellido
          </th>
          <th onClick={() => handleSortBy(SortBy.COUNTRY)} className="pointer">
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          const backgroundColor = coloredRows
            ? "odd:bg-gray-100 even:bg-gray-300 dark:odd:bg-gray-800 dark:even:bg-gray-900"
            : "transparent";
          // en el elemento:   style={{ backgroundColor: backgroundColor }}
          return (
            <tr
              key={user.login.uuid}
              className={`${backgroundColor} rounded [&>td]:transition-colors [&>td]:duration-100 [&>td]:hover:bg-blue-200 dark:[&>td]:hover:bg-blue-950`}
            >
              <td>
                <img
                  className=" mx-auto rounded-full"
                  src={user.picture.thumbnail}
                  alt={`Foto de ${user.name.first}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  className="border border-slate-900 px-2 py-1 transition hover:bg-slate-800 hover:text-white dark:border-slate-200 dark:hover:bg-slate-200 dark:hover:text-black"
                  onClick={() => deleteUser(user.login.uuid)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
