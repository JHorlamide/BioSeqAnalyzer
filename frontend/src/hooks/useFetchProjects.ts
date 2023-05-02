import { useEffect, useState } from "react";
import { useGetProjectsQuery } from "../services/project/projectApi";
import { Projects } from "../services/project/type";

const useFetchProject = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const { data, isLoading } = useGetProjectsQuery();

  useEffect(() => {
    if (data) {
      setProjects(data.data);
    }
  }, []);

  return { projects, isLoading }
}

export default useFetchProject;