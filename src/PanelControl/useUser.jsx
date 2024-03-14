import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/AxiosSecure";
import UseAuth from "./UseAuth";

const useUser = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isUser, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/user/${user.email}`);
            console.log(res.data);
            return res.data?.user;
        }
    })
    return [isUser, isUserLoading]
};

export default useUser;