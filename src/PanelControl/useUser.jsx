import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/AxiosSecure";
import UseAuth from "./UseAuth";

const useUser = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery(
        ['studentData', user?.email],
        async () => {
            const response = await axiosSecure.get(`/users/student/${user?.email}`);
            console.log(response.data)
            return response.data;
        }
    );

    return {
        studentData: data,
        isLoading,
        isError
    };
};

export default useUser;
