import machineStatusManagement from "./api/machineStatusManagement";

export const checkUser = async (phone_number) =>{
        const response = await machineStatusManagement.post('/users/checking/', {username:phone_number});
        if (response.status === 200){
            console.log("data: ", response.data);
            return response.data;
        }
        return {is_exists: false}
}