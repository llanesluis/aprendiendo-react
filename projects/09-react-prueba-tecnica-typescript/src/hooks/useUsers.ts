import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/fetchUsers";
import { User } from "../types.d";
import { useRef } from "react";

export default function useUsers() {
  const originalUsers = useRef<User[]>([]);

  //El hook useQuery no permite realizar paginacion infinita, para eso esta useInfiniteQuery
  const { data, isLoading, isError, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery<{ users: User[]; nextCursor?: number }>(
      ["users"],
      fetchUsers,
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false, //Internamente vuelve a hacer el fetch para mantener actualizado
      },
    );

  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? [];

  return {
    users,
    refetch,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  };
}
