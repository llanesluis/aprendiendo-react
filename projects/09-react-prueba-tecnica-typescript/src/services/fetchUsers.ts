export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`,
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la petición");
      return await res.json();
    })
    .then((res) => {
      const currentPage = Number(res.info.page);
      //Para limitar que solo se haga una paginacion de 10 paginas, cuando regrese undefined ya no se hara el fetching
      const nextCursor = currentPage > 10 ? undefined : currentPage + 1;
      return { users: res.results, nextCursor };
    });
};
