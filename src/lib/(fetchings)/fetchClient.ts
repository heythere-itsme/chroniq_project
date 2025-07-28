'use client'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef } from "react"
import { createClient } from "../supabase/client";
import { toast } from "sonner";

const supabase = createClient()

export const handleLogout = async ( ) => {
    const {error} = await supabase.auth.signOut();
    if (error) toast.error('Error')
}

export const checkSession = async (setIsLoggedIn: any) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    setIsLoggedIn(true);
  }
};

export const useData = ({table, date} : {table: string; date: string}) => {
  const queryClient = useQueryClient()
  const channelRef = useRef<any>(null);

  const fetchMeets = async () => {
    const { data, error } = await supabase.from(table).select("*").order(date, { ascending: true })
    if (error) throw error
    return data
  }

  const query = useQuery({
    queryKey: [table],
    queryFn: fetchMeets,
    staleTime: Infinity,
  })

  useEffect(() => {
    const channel = supabase
      .channel(table)
      .on("postgres_changes", { event: "*", schema: "public", table: table }, () => {
        queryClient.invalidateQueries({ queryKey: [table] })
      })
      .subscribe()

       channelRef.current = channel;

    return () => {
      if(channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
      }
    }
  }, [queryClient, table])

  return query
}

export const useSSubTasks = ({Tid}: {Tid: string | undefined}) => {
  const queryClient = useQueryClient();
  const channelRef = useRef<any>(null);

  const fetchSubTasks = async () => {
    const { data, error } = await supabase
      .from("sub_tasks")
      .select("*")
      .eq('task_id', Tid)
      .order("end_date", { ascending: true });

    if (error) throw error;
    return data;
  };

  const query = useQuery({
    queryKey: ["sub_tasks", Tid],
    queryFn: fetchSubTasks,
    enabled: !!Tid,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!Tid || channelRef.current) return;

    const channel = supabase
      .channel(`subtasks-realtime-${Tid}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sub_tasks", filter: `task_id=eq.${Tid}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ["sub_tasks", Tid] });
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [Tid, queryClient]);

  return query;
};


