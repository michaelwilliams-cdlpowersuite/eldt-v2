import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "../api/studentApi";

interface StudentsProps {}

const Students: React.FC<StudentsProps> = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["students"], // Unique key for this query
    queryFn: fetchStudents, // API call function
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>Students</div>
    </>
  );
};

export default Students;
